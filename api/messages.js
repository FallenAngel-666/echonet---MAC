// In-memory message store for Vercel Serverless environment
let globalMessages = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
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
      if (globalMessages.length > 500) globalMessages.pop();
    }

    return res.status(200).json({
      status: 'ACCEPTED',
      message_id: msg.message_id,
      deduplicated: exists,
      total_stored: globalMessages.length
    });
  }

  if (req.method === 'GET') {
    return res.status(200).json(globalMessages);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
