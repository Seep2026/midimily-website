import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const pageAgentVendorDir = path.resolve(rootDir, 'src/vendor/page-agent/upstream');

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
  resolve: {
    alias: {
      '@page-agent/core': path.join(pageAgentVendorDir, 'packages/core/src/PageAgentCore.ts'),
      '@page-agent/llms': path.join(pageAgentVendorDir, 'packages/llms/src/index.ts'),
      '@page-agent/page-controller': path.join(pageAgentVendorDir, 'packages/page-controller/src/PageController.ts'),
      'ai-motion': path.join(rootDir, 'src/vendor/page-agent/aiMotionStub.ts'),
      chalk: path.join(rootDir, 'src/vendor/page-agent/chalkStub.ts'),
      'zod/v4': path.join(rootDir, 'node_modules/zod/v4/index.js'),
    },
  },
  esbuild: {
    target: 'esnext',
    tsconfigRaw: {
      compilerOptions: {
        target: 'ESNext',
        useDefineForClassFields: true,
      },
    },
  },
  server: {
    fs: {
      allow: [rootDir],
    },
  },
});
