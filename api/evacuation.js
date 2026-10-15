let activeEvacuations = [
  {
    alert_id: "EVAC-HQ-LIVE",
    severity: "CRITICAL",
    affected_area: "High Hazard Sector",
    instructions: "Evacuate immediately to designated high-ground shelters. Avoid low river crossings.",
    issued_at: new Date().toISOString(),
    is_cancelled: 0,
    coordinator: "COMMAND_STATION"
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const alert = req.body;
    if (!alert || !alert.instructions) {
      return res.status(400).json({ error: 'Instructions required' });
    }

    alert.alert_id = alert.alert_id || `EVAC-${Date.now()}`;
    alert.issued_at = new Date().toISOString();
    alert.is_cancelled = 0;
    activeEvacuations.unshift(alert);

    return res.status(200).json({ status: 'BROADCAST_ACCEPTED', alert_id: alert.alert_id });
  }

  if (req.method === 'GET') {
    return res.status(200).json(activeEvacuations);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
