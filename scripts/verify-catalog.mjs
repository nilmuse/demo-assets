#!/usr/bin/env node
/**
 * Verifies that every catalog entry maps to an on-disk file (unless marked pending).
 * Run: node scripts/verify-catalog.mjs
 */

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = join(root, 'catalog.json');

/** @type {{ version: string; baseUrl: string; packages: Record<string, Record<string, { description: string; dir?: string; formats?: string[]; pending?: boolean }>> }} */
const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));

const errors = [];

const expectedTag = `@v${catalog.version}`;
if (!catalog.baseUrl.includes(expectedTag)) {
  errors.push(`baseUrl must include pinned tag ${expectedTag}`);
}

for (const [pkg, assets] of Object.entries(catalog.packages)) {
  for (const [assetKey, meta] of Object.entries(assets)) {
    if (meta.pending) {
      continue;
    }

    if (meta.formats) {
      const folder = meta.dir ?? assetKey;
      for (const format of meta.formats) {
        const rel = join('packages', pkg, folder, `${assetKey}.${format}`);
        const abs = join(root, rel);
        if (!existsSync(abs)) {
          errors.push(`missing file: ${rel.replaceAll('\\', '/')}`);
        }
      }
      continue;
    }

    const rel = join('packages', pkg, assetKey);
    const abs = join(root, rel);
    if (!existsSync(abs)) {
      errors.push(`missing file: ${rel.replaceAll('\\', '/')}`);
    }
  }
}

if (errors.length > 0) {
  console.error('catalog verify failed:\n');
  for (const message of errors) {
    console.error(`  - ${message}`);
  }
  process.exit(1);
}

const assetCount = Object.values(catalog.packages).reduce(
  (sum, assets) => sum + Object.values(assets).filter((a) => !a.pending).length,
  0,
);

console.log(`catalog OK (${assetCount} asset entries, v${catalog.version})`);
