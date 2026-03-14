#!/usr/bin/env node
/**
 * Bisa Photo Upload
 * Starts a secure local server so you can send photos from your phone to this laptop.
 *
 * Usage:
 *   node tools/photo-upload.js
 *   node tools/photo-upload.js --dir "C:/Users/derek/Pictures"
 *
 * - Generates a random one-time URL token each session
 * - Only accessible on your local network (not the internet)
 * - Saves files to ~/Downloads by default
 * - Press Ctrl+C to stop
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ─────────────────────────────────────────────
const PORT = 3456;
const MAX_BODY_MB = 100; // max upload size per request (MB)
const MAX_BODY_BYTES = MAX_BODY_MB * 1024 * 1024;

// --dir argument overrides save location
const dirFlag = process.argv.indexOf('--dir');
const SAVE_DIR = dirFlag !== -1 && process.argv[dirFlag + 1]
  ? process.argv[dirFlag + 1]
  : path.join(os.homedir(), 'Downloads');

// One-time session token — regenerated every run
const TOKEN = crypto.randomBytes(16).toString('hex');

// ── Network ─────────────────────────────────────────────
function getLocalIP() {
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const iface of ifaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return 'localhost';
}

const IP = getLocalIP();
const BASE_URL = `http://${IP}:${PORT}/${TOKEN}`;

// ── Upload page (served to phone) ──────────────────────
function buildPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bisa — Photo Upload</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #FAFAF9; color: #1C1917;
      min-height: 100dvh; display: flex; flex-direction: column;
      align-items: center; justify-content: center; padding: 20px;
    }
    .card {
      background: #fff; border-radius: 20px; padding: 32px 24px;
      width: 100%; max-width: 420px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    }
    h1 { font-size: 1.35rem; margin-bottom: 4px; }
    .sub { font-size: 0.85rem; color: #78716C; margin-bottom: 24px; }
    .zone {
      border: 2px dashed #E7E5E4; border-radius: 14px;
      padding: 36px 16px; text-align: center; cursor: pointer;
      transition: border-color .2s, background .2s; margin-bottom: 14px;
    }
    .zone.active { border-color: #10B981; background: #f0fdf9; }
    .zone input { display: none; }
    .zone-icon { font-size: 2.2rem; margin-bottom: 8px; }
    .zone-text { font-size: 0.9rem; color: #78716C; }
    .file-list { font-size: 0.78rem; margin-top: 10px; text-align: left; }
    .file-list div {
      padding: 5px 0; border-bottom: 1px solid #F5F5F4;
      display: flex; justify-content: space-between;
    }
    .file-name { color: #1C1917; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .file-size { color: #A8A29E; margin-left: 8px; flex-shrink: 0; }
    .progress-wrap {
      height: 5px; background: #F5F5F4; border-radius: 9999px;
      overflow: hidden; margin-bottom: 14px; display: none;
    }
    .progress-bar {
      height: 100%; background: #10B981; border-radius: 9999px;
      width: 0%; transition: width .25s;
    }
    button {
      width: 100%; padding: 15px; background: #1C1917; color: #fff;
      border: none; border-radius: 9999px; font-size: 1rem;
      font-weight: 600; cursor: pointer; transition: opacity .2s;
    }
    button:disabled { opacity: 0.35; cursor: not-allowed; }
    button:not(:disabled):active { opacity: 0.8; }
    .status {
      margin-top: 14px; font-size: 0.85rem;
      text-align: center; min-height: 18px; line-height: 1.4;
    }
    .ok  { color: #10B981; font-weight: 600; }
    .err { color: #EF4444; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Upload Photos</h1>
    <p class="sub">Secure · local network only · this session</p>

    <div class="zone" id="zone" onclick="document.getElementById('fi').click()">
      <div class="zone-icon">📷</div>
      <div class="zone-text">Tap to choose photos or videos</div>
      <div class="file-list" id="list"></div>
      <input type="file" id="fi" accept="image/*,video/*" multiple>
    </div>

    <div class="progress-wrap" id="pw"><div class="progress-bar" id="pb"></div></div>
    <button id="btn" disabled onclick="go()">Upload</button>
    <div class="status" id="st"></div>
  </div>

  <script>
    const fi = document.getElementById('fi');
    const btn = document.getElementById('btn');
    const zone = document.getElementById('zone');
    const list = document.getElementById('list');
    const st = document.getElementById('st');
    const pw = document.getElementById('pw');
    const pb = document.getElementById('pb');

    fi.addEventListener('change', () => {
      const files = [...fi.files];
      if (!files.length) return;
      zone.classList.add('active');
      list.innerHTML = files.map(f =>
        '<div><span class="file-name">' + esc(f.name) + '</span>' +
        '<span class="file-size">' + (f.size/1024/1024).toFixed(1) + ' MB</span></div>'
      ).join('');
      btn.disabled = false;
      st.textContent = '';
      st.className = 'status';
    });

    async function go() {
      const files = [...fi.files];
      if (!files.length) return;
      btn.disabled = true;
      pw.style.display = 'block';
      st.textContent = '';
      let ok = 0, errs = [];

      for (let i = 0; i < files.length; i++) {
        st.textContent = 'Uploading ' + (i+1) + ' of ' + files.length + '…';
        pb.style.width = (i / files.length * 100) + '%';
        try {
          const b64 = await toBase64(files[i]);
          const r = await fetch('/${TOKEN}/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: files[i].name, type: files[i].type, data: b64 })
          });
          if (!r.ok) throw new Error(await r.text());
          ok++;
        } catch(e) { errs.push(files[i].name + ': ' + e.message); }
      }

      pb.style.width = '100%';
      if (!errs.length) {
        st.textContent = '✓ ' + ok + ' file' + (ok !== 1 ? 's' : '') + ' saved to your laptop';
        st.className = 'status ok';
        fi.value = ''; zone.classList.remove('active'); list.innerHTML = '';
      } else {
        st.textContent = ok + ' saved. Failed: ' + errs.join(' | ');
        st.className = 'status err';
      }
      btn.disabled = false;
    }

    function toBase64(file) {
      return new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(',')[1]);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
    }

    function esc(s) {
      return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
  </script>
</body>
</html>`;
}

// ── Server ──────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const rawPath = req.url.split('?')[0];
  const parts = rawPath.split('/').filter(Boolean);

  // Every request must carry the session token as the first path segment
  if (parts[0] !== TOKEN) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // GET /<token>  →  serve upload page
  if (req.method === 'GET' && parts.length === 1) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(buildPage());
    return;
  }

  // POST /<token>/upload  →  save file
  if (req.method === 'POST' && parts[1] === 'upload') {
    const chunks = [];
    let size = 0;
    let aborted = false;

    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        aborted = true;
        res.writeHead(413, { 'Content-Type': 'text/plain' });
        res.end(`Too large — max ${MAX_BODY_MB}MB per request`);
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (aborted) return;
      try {
        const { name, data } = JSON.parse(Buffer.concat(chunks).toString());

        // Sanitize filename — no path traversal, no weird chars
        const safe = path.basename(name || 'photo').replace(/[^a-zA-Z0-9._-]/g, '_');
        const ext  = path.extname(safe) || '.jpg';
        const base = path.basename(safe, ext);
        const ts   = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const filename = `${base}_${ts}${ext}`;
        const dest = path.join(SAVE_DIR, filename);

        fs.mkdirSync(SAVE_DIR, { recursive: true });
        fs.writeFileSync(dest, Buffer.from(data, 'base64'));

        const mb = (fs.statSync(dest).size / 1024 / 1024).toFixed(2);
        console.log(`  ✓  ${filename}  (${mb} MB)`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, filename }));
      } catch (err) {
        console.error('  ✗  Error:', err.message);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server error');
      }
    });

    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

// ── Start ───────────────────────────────────────────────
server.listen(PORT, '0.0.0.0', () => {
  const line = '─'.repeat(50);
  console.log(`\n┌${line}┐`);
  console.log(`│  Bisa Photo Upload                               │`);
  console.log(`├${line}┤`);
  console.log(`│  Open this URL on your phone:                    │`);
  console.log(`│                                                  │`);
  console.log(`│  ${BASE_URL.padEnd(48)}│`);
  console.log(`│                                                  │`);
  console.log(`├${line}┤`);
  console.log(`│  Saving to: ${SAVE_DIR.slice(0, 37).padEnd(37)}│`);
  console.log(`│  Max upload: ${String(MAX_BODY_MB + 'MB').padEnd(36)}│`);
  console.log(`│  Press Ctrl+C to stop                            │`);
  console.log(`└${line}┘\n`);
});

process.on('SIGINT', () => {
  console.log('\nStopped.');
  process.exit(0);
});
