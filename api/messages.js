// In-memory message store & archive for Vercel Serverless environment
let globalMessages = [];
let globalHistory = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Single message delete
  if (req.method === 'DELETE' && req.query.id) {
    const targetId = req.query.id;
    const target = globalMessages.find(m => m.message_id === targetId);
    if (target) {
      if (!globalHistory.some(h => h.message_id === target.message_id)) globalHistory.unshift(target);
      globalMessages = globalMessages.filter(m => m.message_id !== targetId);
    }
    return res.status(200).json({ ok: true, deleted_id: targetId });
  }

  // Clear requests endpoint
  if (req.method === 'DELETE' || (req.method === 'POST' && req.query.action === 'clear')) {
    const clearedCount = globalMessages.length;
    // Archive to history
    globalHistory = [...globalMessages, ...globalHistory];
    globalMessages = [];
    return res.status(200).json({ ok: true, cleared_count: clearedCount, message: "Queue cleared" });
  }

  if (req.method === 'POST') {
    const msg = req.body;
    if (!msg || !msg.message_id) {
      return res.status(400).json({ error: 'Invalid message payload' });
    }

    // Deduplicate
    const exists = globalMessages.some(m => m.message_id === msg.message_id);
    if (!exists) {
      msg.received_at = new Date().toISOString();
      globalMessages.unshift(msg);
      globalHistory.unshift(msg);
      if (globalMessages.length > 500) globalMessages.pop();
      if (globalHistory.length > 2000) globalHistory.pop();
    }

    return res.status(200).json({
      status: 'ACCEPTED',
      message_id: msg.message_id,
      deduplicated: exists,
      total_stored: globalMessages.length
    });
  }

  if (req.method === 'GET') {
    if (req.query.action === 'history') {
      return res.status(200).json(globalHistory);
    }
    return res.status(200).json(globalMessages);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
