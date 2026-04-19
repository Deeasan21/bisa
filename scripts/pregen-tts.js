/**
 * Pre-generate ElevenLabs TTS audio for every spoken string in the lessons,
 * and upload to Vercel Blob under the same cache keys `api/tts.js` uses.
 *
 * After this runs, the TTS endpoint serves lesson audio from Blob cache —
 * zero ElevenLabs calls on playback.
 *
 * Usage:
 *   1. Pull env vars:   vercel env pull .env.local
 *   2. Run:             node --env-file=.env.local scripts/pregen-tts.js
 *
 * Required env vars (same as api/tts.js):
 *   ELEVENLABS_API_KEY
 *   ELEVENLABS_VOICE_ID
 *   BLOB_READ_WRITE_TOKEN
 * Optional:
 *   ELEVENLABS_PRONUNCIATION_DICT_ID
 *
 * Flags:
 *   --dry-run       List every text that would be generated + count chars. No API calls.
 *   --force         Re-generate even if the Blob key already exists.
 *   --lesson <id>   Only include the Enya intro + the given lesson id (e.g. --lesson 0).
 *                   Repeatable: --lesson 0 --lesson 1.
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { put, head } from '@vercel/blob';
import { LESSONS } from '../src/data/lessons.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROGRESS_LOG = path.join(__dirname, 'tts-progress.log');

function logProgress(line) {
  fs.appendFileSync(PROGRESS_LOG, `${new Date().toISOString()} ${line}\n`);
}

// --- Keep in sync with api/tts.js ---
const CACHE_VERSION = 'v5';
const ENYA_INTRO =
  "Hi, I'm Enya — your guide through Bisa. I'll be reading your lessons aloud as you learn. Let's begin.";

// --- Keep in sync with src/hooks/useSpeech.js ---
function htmlToSpeechText(html) {
  if (!html) return '';
  return html
    .replace(/<\/?(h[1-6])[^>]*>/gi, '. ')
    .replace(/<li[^>]*>/gi, '. ')
    .replace(/<\/?(p|div|section)[^>]*>/gi, '. ')
    .replace(/<br\s*\/?>/gi, ', ')
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '$1')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, 'and')
    .replace(/&mdash;|—/g, ', ')
    .replace(/"([^"]{1,30})[?!]"/g, '"$1"')
    .replace(/[""]/g, '')
    .replace(/\s*\.\s*\.\s*/g, '. ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// --- Keep in sync with src/components/learn/ConsequenceExplorer.jsx ---
const QUALITY_LABEL = {
  great: 'Opens up the conversation',
  okay: 'Gets a surface response',
  poor: 'Shuts down the conversation',
};

function getCacheKey(text, voiceId) {
  const hash = crypto
    .createHash('sha256')
    .update(text + voiceId + CACHE_VERSION)
    .digest('hex')
    .slice(0, 24);
  return `tts/${CACHE_VERSION}/${hash}.mp3`;
}

// Collect every string the app will send to `/api/tts`, in order.
// `lessonFilter` — if non-null, only include lessons whose id is in the set (intro always included).
function collectSpokenTexts(lessonFilter = null) {
  const raw = [];
  raw.push({ label: 'Enya intro', text: ENYA_INTRO });

  for (const lesson of LESSONS) {
    if (lessonFilter && !lessonFilter.has(lesson.id)) continue;
    for (const section of lesson.sections || []) {
      const header = [section.title, section.content].filter(Boolean).join('. ');
      if (header) {
        raw.push({ label: `L${lesson.id} §${section.id} (section)`, text: header });
      }

      const i = section.interaction;
      if (!i) continue;

      if (i.type === 'micro-challenge' && i.explanation) {
        raw.push({ label: `L${lesson.id} §${section.id} (micro explanation)`, text: i.explanation });
      } else if (i.type === 'before-after') {
        const t = [i.after ? `After: ${i.after}` : null, i.explanation].filter(Boolean).join('. ');
        if (t) raw.push({ label: `L${lesson.id} §${section.id} (before/after reveal)`, text: t });
      } else if (i.type === 'consequence-explorer') {
        const phrasings = i.phrasings ?? i.scenarios?.map(s => ({
          quality: s.label,
          consequence: s.outcome,
        })) ?? [];
        for (const [idx, p] of phrasings.entries()) {
          const t = `${QUALITY_LABEL[p.quality] || ''}. ${p.consequence || ''}`.trim();
          if (t) raw.push({ label: `L${lesson.id} §${section.id} (phrasing ${idx})`, text: t });
        }
      }
    }
  }

  const seen = new Map();
  for (const item of raw) {
    const cleaned = htmlToSpeechText(item.text);
    if (!cleaned) continue;
    if (!seen.has(cleaned)) seen.set(cleaned, item.label);
  }
  return [...seen.entries()].map(([text, label]) => ({ text, label }));
}

async function synthesize(text, apiKey, voiceId, dictId) {
  const body = {
    text,
    model_id: 'eleven_multilingual_v2',
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.8,
      style: 0.45,
      use_speaker_boost: true,
    },
  };
  if (dictId) {
    body.pronunciation_dictionary_locators = [
      { pronunciation_dictionary_id: dictId, version_id: 'yN6x9FAFtaMnvlgCkL32' },
    ];
  }

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    const err = new Error(`ElevenLabs ${res.status}: ${errText}`);
    err.status = res.status;
    err.body = errText;
    throw err;
  }
  return Buffer.from(await res.arrayBuffer());
}

async function blobExists(key, token) {
  try {
    await head(key, { token });
    return true;
  } catch {
    return false;
  }
}

function parseArgs(argv) {
  const flags = new Set();
  const lessons = new Set();
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--lesson') {
      const n = Number(argv[++i]);
      if (!Number.isInteger(n)) {
        console.error(`--lesson requires an integer id, got: ${argv[i]}`);
        process.exit(1);
      }
      lessons.add(n);
    } else {
      flags.add(a);
    }
  }
  return { flags, lessons };
}

async function main() {
  const { flags, lessons } = parseArgs(process.argv.slice(2));
  const dryRun = flags.has('--dry-run');
  const force = flags.has('--force');
  const lessonFilter = lessons.size > 0 ? lessons : null;

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const dictId = process.env.ELEVENLABS_PRONUNCIATION_DICT_ID || null;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (!dryRun && (!apiKey || !voiceId || !blobToken)) {
    console.error('Missing env. Run: vercel env pull .env.local');
    console.error(`  ELEVENLABS_API_KEY: ${apiKey ? 'set' : 'MISSING'}`);
    console.error(`  ELEVENLABS_VOICE_ID: ${voiceId ? 'set' : 'MISSING'}`);
    console.error(`  BLOB_READ_WRITE_TOKEN: ${blobToken ? 'set' : 'MISSING'}`);
    process.exit(1);
  }

  const items = collectSpokenTexts(lessonFilter);
  const totalChars = items.reduce((sum, it) => sum + it.text.length, 0);
  const scope = lessonFilter ? `lessons [${[...lessonFilter].join(', ')}]` : 'all lessons';

  console.log(`Scope: ${scope}. Collected ${items.length} unique texts, ${totalChars.toLocaleString()} total chars.`);

  if (dryRun) {
    console.log('\n--- DRY RUN ---');
    for (const it of items) {
      console.log(`[${it.text.length.toString().padStart(4)} chars] ${it.label}`);
      console.log(`  ${it.text.slice(0, 100)}${it.text.length > 100 ? '…' : ''}\n`);
    }
    console.log(`Would cost ~${totalChars.toLocaleString()} ElevenLabs credits (1 credit ≈ 1 char).`);
    return;
  }

  let generated = 0;
  let skipped = 0;
  let failed = 0;
  let charsSpent = 0;

  for (const [idx, it] of items.entries()) {
    const key = getCacheKey(it.text, voiceId);
    const prefix = `[${idx + 1}/${items.length}] ${it.label}`;

    if (!force && (await blobExists(key, blobToken))) {
      console.log(`${prefix} — cached, skip`);
      logProgress(`CACHED ${it.label}`);
      skipped++;
      continue;
    }

    try {
      process.stdout.write(`${prefix} — generating (${it.text.length} chars)… `);
      const audio = await synthesize(it.text, apiKey, voiceId, dictId);
      await put(key, audio, {
        access: 'public',
        token: blobToken,
        contentType: 'audio/mpeg',
        addRandomSuffix: false,
        allowOverwrite: true,
      });
      charsSpent += it.text.length;
      generated++;
      console.log(`ok (${audio.length.toLocaleString()} bytes)`);
      logProgress(`GENERATED ${it.label} (${it.text.length} chars)`);
    } catch (err) {
      failed++;
      console.log(`FAILED`);
      console.error(`  ${err.message}`);
      logProgress(`FAILED ${it.label} — ${err.message}`);
      if (err.status === 401 && /quota/i.test(err.body || '')) {
        console.error('\nQuota exhausted — stopping. Re-run after reset / top-up to pick up where this left off.');
        logProgress(`STOP quota_exceeded at ${it.label}`);
        break;
      }
    }
  }

  const summary = `Done. generated=${generated}  skipped=${skipped}  failed=${failed}  credits used≈${charsSpent.toLocaleString()}`;
  console.log(`\n${summary}`);
  logProgress(summary);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
