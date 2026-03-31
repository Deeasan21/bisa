/**
 * Vercel Serverless Function — Team Invite Email
 *
 * Sends an invite email via Resend when an org admin invites a team member.
 * The invite link is generated client-side and passed in the request body.
 *
 * Required env vars:
 *   RESEND_API_KEY     — from resend.com → API Keys
 *   RESEND_FROM_EMAIL  — verified sender address (e.g. "Bisa <noreply@neaobisa.com>")
 *
 * Security:
 * - Origin validation (Bisa domains only)
 * - Input validation (email format, invite link format)
 */

const ALLOWED_ORIGINS = [
  'https://neaobisa.com',
  'https://www.neaobisa.com',
  'https://bisa-eta.vercel.app',
  'http://localhost:5173',
  'http://localhost:4173',
];

function isAllowedOrigin(req) {
  const origin = req.headers.origin || '';
  const referer = req.headers.referer || '';
  if (
    origin.includes('deeasan21s-projects.vercel.app') ||
    referer.includes('deeasan21s-projects.vercel.app')
  ) return true;
  return ALLOWED_ORIGINS.some(o => origin.startsWith(o) || referer.startsWith(o));
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 320;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { to, inviteLink, inviterName, orgName } = req.body || {};

  if (!isValidEmail(to)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  if (typeof inviteLink !== 'string' || !inviteLink.startsWith('https://')) {
    return res.status(400).json({ error: 'Invalid invite link' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Bisa <noreply@neaobisa.com>';

  if (!apiKey) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const inviterDisplay = inviterName || 'Someone';
  const orgDisplay = orgName || 'their team';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#fafaf9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fafaf9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:520px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#7c3aed;padding:32px 40px;text-align:center;">
              <span style="font-size:28px;font-weight:800;color:#fff;letter-spacing:-0.5px;">bisa</span>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1c1917;">You're invited to join ${orgDisplay}</h1>
              <p style="margin:0 0 24px;font-size:15px;color:#78716c;line-height:1.6;">
                ${inviterDisplay} has invited you to join <strong>${orgDisplay}</strong> on Bisa — the app that helps teams ask better questions.
              </p>
              <a href="${inviteLink}" style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 28px;border-radius:10px;">
                Accept invite
              </a>
              <p style="margin:24px 0 0;font-size:13px;color:#a8a29e;line-height:1.6;">
                Or copy this link into your browser:<br>
                <span style="color:#7c3aed;word-break:break-all;">${inviteLink}</span>
              </p>
              <p style="margin:16px 0 0;font-size:12px;color:#d6d3d1;">
                This invite expires in 7 days. If you weren't expecting this, you can safely ignore it.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject: `${inviterDisplay} invited you to join ${orgDisplay} on Bisa`,
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('Resend error:', err);
      return res.status(502).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('invite handler error:', e);
    return res.status(500).json({ error: 'Internal error' });
  }
}
