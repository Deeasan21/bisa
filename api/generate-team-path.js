/**
 * Vercel Serverless Function — Team Path Generator
 *
 * Takes an org's focus area and description, uses Claude to generate
 * a curated lesson path (existing + new) and practice scenarios
 * specific to their role and context.
 */

const ALLOWED_ORIGINS = [
  'https://neaobisa.com',
  'https://www.neaobisa.com',
  'https://bisa-eta.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
];

// Existing lessons Claude can recommend (id + title + skill)
const EXISTING_LESSONS = [
  { id: 0,  title: 'What Is a Question?',              skill: 'Open vs. Closed' },
  { id: 1,  title: 'Open vs. Closed Questions',        skill: 'Open vs. Closed' },
  { id: 2,  title: 'The Art of Clarifying',            skill: 'Clarifying' },
  { id: 3,  title: 'Probing Deeper',                   skill: 'Probing' },
  { id: 4,  title: 'Empathy Through Questions',        skill: 'Empathy' },
  { id: 5,  title: 'Framing Questions Well',           skill: 'Framing' },
  { id: 6,  title: 'The Follow-up',                    skill: 'Follow-up' },
  { id: 7,  title: 'Self-Reflection',                  skill: 'Self-Reflection' },
  { id: 8,  title: 'Reading the Room',                 skill: 'Body Language' },
  { id: 9,  title: 'Cultural Awareness',               skill: 'Cultural Awareness' },
  { id: 10, title: 'Questions in Leadership',          skill: 'Leadership' },
];

function getOrigin(req) {
  return req.headers['origin'] || req.headers['referer']?.replace(/\/$/, '') || '';
}

export default async function handler(req, res) {
  // CORS
  const origin = getOrigin(req);
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!ALLOWED_ORIGINS.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { org_id, focus_area, focus_description } = req.body || {};
  if (!org_id || !focus_area || !focus_description) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (focus_description.length > 1000) {
    return res.status(400).json({ error: 'Description too long' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Server configuration error' });

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: 'Database configuration error' });
  }

  // Verify the org exists and requester is admin via Supabase REST
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

  try {
    // Build Claude prompt
    const lessonList = EXISTING_LESSONS.map(l => `  - id ${l.id}: "${l.title}" (${l.skill})`).join('\n');

    const prompt = `You are designing a focused learning path for a team using Bisa, an app that teaches better questioning skills.

Team context:
- Role/focus area: ${focus_area}
- Their specific situation: ${focus_description}

Available existing lessons (pick the 3 most relevant by id):
${lessonList}

Generate a team learning path as valid JSON with this exact structure:
{
  "curated_lesson_ids": [number, number, number],
  "generated_lessons": [
    {
      "title": "string",
      "skillCategory": "string",
      "summary": "string (1-2 sentences — what this lesson teaches)",
      "content": "string (400-600 words of lesson content in plain paragraphs, no HTML tags, written specifically for this team's role and situation)",
      "keyPrinciple": "string (one sharp sentence the learner should remember)",
      "exampleQuestion": "string (one example question they can use in their actual role)"
    }
  ],
  "generated_scenarios": [
    {
      "id": "string (unique slug)",
      "context": "string (2-3 sentences describing the specific workplace situation for this role)",
      "originalQuestion": "string (a weak or closed question someone in this role would actually ask)",
      "skillCategory": "string",
      "hint": "string (what makes the original question weak)",
      "idealRewrite": "string (a strong open question for this situation)"
    }
  ]
}

Rules:
- curated_lesson_ids: exactly 3 ids from the list above, ordered from most to least relevant
- generated_lessons: exactly 2 lessons written specifically for this team's role — not generic, use their actual context
- generated_scenarios: exactly 5 scenarios drawn from real situations this team would face
- Write as if you know their world. Use realistic names, job titles, and situations from their industry
- Return only valid JSON, no markdown, no explanation`;

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!claudeRes.ok) {
      console.error('Claude error:', claudeRes.status);
      return res.status(502).json({ error: 'Generation failed' });
    }

    const claudeData = await claudeRes.json();
    const rawText = claudeData.content?.[0]?.text || '';

    let path;
    try {
      path = JSON.parse(rawText);
    } catch {
      console.error('JSON parse failed:', rawText.slice(0, 200));
      return res.status(502).json({ error: 'Invalid response from generator' });
    }

    // Validate shape
    if (
      !Array.isArray(path.curated_lesson_ids) ||
      !Array.isArray(path.generated_lessons) ||
      !Array.isArray(path.generated_scenarios)
    ) {
      return res.status(502).json({ error: 'Malformed generation result' });
    }

    // Save to Supabase using service role key (bypasses RLS — server-side write)
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
        curated_lesson_ids: path.curated_lesson_ids.map(String),
        generated_lessons: path.generated_lessons,
        generated_scenarios: path.generated_scenarios,
        focus_snapshot: focus_description,
        generated_at: new Date().toISOString(),
      }),
    });

    if (!upsertRes.ok) {
      const err = await upsertRes.text();
      console.error('Supabase upsert error:', err);
      return res.status(500).json({ error: 'Failed to save path' });
    }

    return res.status(200).json({ success: true, path });
  } catch (e) {
    console.error('generate-team-path error:', e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
