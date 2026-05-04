import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { buildDeck } from './build-deck.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const decksDir = path.join(rootDir, 'decks');

const entries = await readdir(decksDir, { withFileTypes: true });
const slugs = entries
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .filter((name) => !name.startsWith('_'))
  .filter((name) => existsSync(path.join(decksDir, name, 'slides.md')))
  .sort();

if (slugs.length === 0) {
  console.log('No decks with slides.md found.');
  process.exit(0);
}

const results = [];

for (const slug of slugs) {
  console.log(`\nBuilding deck: ${slug}`);

  try {
    const result = await buildDeck(slug);
    results.push({ slug, ok: true, path: result.base });
    console.log(`Built ${slug}: ${result.base}`);
  } catch (error) {
    results.push({ slug, ok: false, error: error.message });
    console.error(`Failed ${slug}: ${error.message}`);
  }
}

const failed = results.filter((result) => !result.ok);

console.log('\nDeck build summary');
for (const result of results) {
  console.log(result.ok ? `✓ ${result.slug} -> ${result.path}` : `✗ ${result.slug} -> ${result.error}`);
}

if (failed.length > 0) {
  process.exit(1);
}
