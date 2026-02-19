import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Dev middleware plugin: handles /api/claude requests locally
 * by forwarding to the Anthropic Messages API.
 * In production, Vercel routes /api/* to serverless functions.
 */
function claudeProxyPlugin() {
  return {
    name: 'claude-api-proxy',
    configureServer(server) {
      server.middlewares.use('/api/claude', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        // Read request body
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const body = JSON.parse(Buffer.concat(chunks).toString());

        const { messages, system, apiKey, max_tokens = 1024 } = body;

        if (!apiKey) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'No API key provided' }));
          return;
        }

        try {
          const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': apiKey,
              'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
              model: 'claude-sonnet-4-20250514',
              max_tokens: Math.min(Number(max_tokens) || 1024, 1024),
              ...(system ? { system } : {}),
              messages,
            }),
          });

          const data = await response.json();
          res.statusCode = response.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Failed to reach Anthropic API' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), claudeProxyPlugin()],
  optimizeDeps: {
    exclude: ['sql.js']
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  }
})
