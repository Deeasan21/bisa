/**
 * Vercel Serverless Function — Restore Team Path Version
 *
 * Swaps a history entry into the active path, pushing the current
 * active path back into history. Requires admin auth.
 */

const ALLOWED_ORIGINS = [
  'https://neaobisa.com',
  'https://www.neaobisa.com',
  'https://bisa-eta.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
];

function getOrigin(req) {
  return req.headers['origin'] || req.headers['referer']?.replace(/\/$/, '') || '';
}

export default async function handler(req, res) {
  const origin = getOrigin(req);
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!ALLOWED_ORIGINS.includes(origin)) return res.status(403).json({ error: 'Forbidden' });

  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  const { org_id, history_index } = req.body || {};
  if (!org_id || history_index === undefined || history_index === null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Database configuration error' });
  }

  // Decode JWT and verify org admin role
  const token = authHeader.replace(/^Bearer\s+/i, '');
  try {
    const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { 'Authorization': `Bearer ${token}`, 'apikey': supabaseServiceKey },
    });
    if (!userRes.ok) return res.status(401).json({ error: 'Invalid token' });
    const userData = await userRes.json();
    const userId = userData?.id;
    if (!userId) return res.status(401).json({ error: 'Invalid token' });

    const memberRes = await fetch(
      `${supabaseUrl}/rest/v1/org_members?org_id=eq.${org_id}&user_id=eq.${userId}&role=eq.admin&select=id`,
      { headers: { 'apikey': supabaseServiceKey, 'Authorization': `Bearer ${supabaseServiceKey}` } }
    );
    const members = memberRes.ok ? await memberRes.json() : [];
    if (!members?.length) return res.status(403).json({ error: 'Not an org admin' });
  } catch (e) {
    console.error('Auth check error:', e);
    return res.status(401).json({ error: 'Authorization failed' });
  }

  try {
    // Fetch current path
    const fetchRes = await fetch(
      `${supabaseUrl}/rest/v1/team_paths?org_id=eq.${org_id}&select=*`,
      {
        headers: {
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
      }
    );
    if (!fetchRes.ok) return res.status(502).json({ error: 'Failed to fetch current path' });

    const rows = await fetchRes.json();
    const current = rows?.[0];
    if (!current) return res.status(404).json({ error: 'No path found' });

    const history = current.history || [];
    const target = history[history_index];
    if (!target) return res.status(400).json({ error: 'Invalid history index' });

    // Build new history: push current into history (removing the target slot), cap at 5
    const currentSnapshot = {
      generated_at: current.generated_at,
      focus_snapshot: current.focus_snapshot,
      curated_lesson_ids: current.curated_lesson_ids,
      generated_lessons: current.generated_lessons,
      generated_scenarios: current.generated_scenarios,
    };
    const newHistory = [
      currentSnapshot,
      ...history.filter((_, i) => i !== history_index),
    ].slice(0, 5);

    // Write restored path as active
    const upsertRes = await fetch(`${supabaseUrl}/rest/v1/team_paths`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify({
        org_id,
        curated_lesson_ids: target.curated_lesson_ids,
        generated_lessons: target.generated_lessons,
        generated_scenarios: target.generated_scenarios,
        focus_snapshot: target.focus_snapshot,
        generated_at: target.generated_at,
        history: newHistory,
      }),
    });

    if (!upsertRes.ok) {
      const err = await upsertRes.text();
      console.error('Supabase restore error:', err);
      return res.status(500).json({ error: 'Failed to restore path' });
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    console.error('restore-team-path error:', e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
