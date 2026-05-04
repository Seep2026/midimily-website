import { existsSync } from 'node:fs';
import { mkdir, rename, rm } from 'node:fs/promises';
import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function resolveSlidevRunner() {
  const slidevCliEntry = path.join(rootDir, 'node_modules', '@slidev', 'cli', 'bin', 'slidev.mjs');
  if (existsSync(slidevCliEntry)) {
    return { command: process.execPath, argsPrefix: [slidevCliEntry], needsSlidevCommand: false };
  }

  const localSlidev = path.join(rootDir, 'node_modules', '.bin', process.platform === 'win32' ? 'slidev.cmd' : 'slidev');
  if (existsSync(localSlidev)) {
    return { command: localSlidev, argsPrefix: [], needsSlidevCommand: false };
  }

  const hasPnpm = spawnSync('pnpm', ['--version'], { stdio: 'ignore' }).status === 0;
  if (hasPnpm) {
    return { command: 'pnpm', argsPrefix: ['exec'], needsSlidevCommand: true };
  }

  const hasNpm = spawnSync('npm', ['--version'], { stdio: 'ignore' }).status === 0;
  if (hasNpm) {
    return { command: 'npm', argsPrefix: ['exec', '--'], needsSlidevCommand: true };
  }

  const hasNpx = spawnSync('npx', ['--version'], { stdio: 'ignore' }).status === 0;
  if (hasNpx) {
    return { command: 'npx', argsPrefix: [], needsSlidevCommand: true };
  }

  throw new Error('Missing Slidev CLI. Please run npm install first.');
}

export async function buildDeck(slug) {
  if (!slug) {
    throw new Error('Missing deck slug. Usage: node scripts/build-deck.mjs <slug>');
  }

  const slideFile = path.join(rootDir, 'decks', slug, 'slides.md');

  if (!existsSync(slideFile)) {
    throw new Error(`Missing Slidev source: ${path.relative(rootDir, slideFile)}`);
  }

  // The React SPA still owns /solutions/:slug/deck, so Slidev is published
  // under /slidev for this validation phase to avoid route ambiguity.
  const base = `/solutions/${slug}/slidev/`;
  const outDir = path.join(rootDir, 'public', 'solutions', slug, 'slidev');
  const tempDir = path.join(rootDir, '.tmp-deck-build', `${slug}-${Date.now()}`);
  await mkdir(tempDir, { recursive: true });

  const runner = resolveSlidevRunner();
  const slidevCommandArgs = runner.needsSlidevCommand ? ['slidev'] : [];
  const args = [...runner.argsPrefix, ...slidevCommandArgs, 'build', slideFile, '--base', base, '--out', tempDir];

  try {
    await new Promise((resolve, reject) => {
      const child = spawn(runner.command, args, {
        cwd: rootDir,
        stdio: 'inherit',
        shell: process.platform === 'win32',
      });

      child.on('error', reject);
      child.on('exit', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Slidev build failed for ${slug} with exit code ${code ?? 1}`));
        }
      });
    });

    await rm(outDir, { recursive: true, force: true });
    await mkdir(path.dirname(outDir), { recursive: true });
    await rename(tempDir, outDir);
  } catch (error) {
    await rm(tempDir, { recursive: true, force: true });
    throw error;
  }

  return {
    slug,
    base,
    outDir,
    slideFile,
    relativeOutDir: path.relative(rootDir, outDir),
  };
}

const isCli = import.meta.url === pathToFileURL(process.argv[1]).href;

if (isCli) {
  const slug = process.argv.slice(2).find((arg) => arg !== '--');

  try {
    const result = await buildDeck(slug);
    console.log(`Slidev deck built at ${result.relativeOutDir}`);
    console.log(`Public path: ${result.base}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
