#!/usr/bin/env node
import { chmodSync, cpSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(__dirname, '..');
const repoRoot = resolve(pkgRoot, '../..');

const distDir = resolve(pkgRoot, 'dist');
const distContext = resolve(distDir, '.context');
const sourceContext = resolve(repoRoot, '.context');

if (!existsSync(sourceContext)) {
  console.error(`postbuild: source .context/ not found at ${sourceContext}`);
  process.exit(1);
}

mkdirSync(distContext, { recursive: true });
cpSync(sourceContext, distContext, { recursive: true });
console.error(`postbuild: copied .context/ -> ${distContext}`);

const binPath = resolve(distDir, 'index.js');
if (existsSync(binPath)) {
  chmodSync(binPath, 0o755);
  console.error(`postbuild: chmod +x ${binPath}`);
}
