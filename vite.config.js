import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function slidevDirectoryIndex() {
  const serveSlidevIndex = async (req, res, next) => {
    const url = new URL(req.url || '/', 'http://localhost');
    const match = url.pathname.match(/^\/solutions\/([^/]+)\/slidev(?:\/.*)?$/);

    if (!match || url.pathname.includes('/assets/') || path.extname(url.pathname)) {
      next();
      return;
    }

    const indexFile = path.join(rootDir, 'public', 'solutions', match[1], 'slidev', 'index.html');

    if (!existsSync(indexFile)) {
      next();
      return;
    }

    const html = await readFile(indexFile, 'utf8');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(html);
  };

  return {
    name: 'midimily-slidev-directory-index',
    configureServer(server) {
      server.middlewares.use(serveSlidevIndex);
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveSlidevIndex);
    },
  };
}

export default defineConfig({
  plugins: [slidevDirectoryIndex(), react(), tailwindcss()],
});
