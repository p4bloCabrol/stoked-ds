import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// When installed from npm, slices live next to the compiled JS (dist/.context/).
// When running from source in the monorepo, slices live at <repo-root>/.context/.
const BUNDLED_CONTEXT_DIR = resolve(__dirname, '../.context');
const REPO_CONTEXT_DIR = resolve(__dirname, '../../../../.context');

let resolvedContextDir: string | null = null;

async function resolveContextDir(): Promise<string> {
  if (resolvedContextDir) return resolvedContextDir;

  for (const candidate of [BUNDLED_CONTEXT_DIR, REPO_CONTEXT_DIR]) {
    try {
      await access(resolve(candidate, 'index.md'));
      resolvedContextDir = candidate;
      return candidate;
    } catch {
      // try next candidate
    }
  }

  throw new Error(
    `Could not locate .context/ directory. Looked in:\n  - ${BUNDLED_CONTEXT_DIR}\n  - ${REPO_CONTEXT_DIR}`,
  );
}

export type SliceName =
  | 'index'
  | 'tokens'
  | 'patterns'
  | 'a11y'
  | 'testing'
  | 'stories'
  | 'components'
  | 'roadmap';

const cache = new Map<SliceName, string>();

export async function readSlice(name: SliceName): Promise<string> {
  const cached = cache.get(name);
  if (cached) return cached;

  const dir = await resolveContextDir();
  const path = resolve(dir, `${name}.md`);
  const content = await readFile(path, 'utf-8');
  cache.set(name, content);
  return content;
}

export async function readAllSlices(): Promise<Record<SliceName, string>> {
  const names: SliceName[] = [
    'index',
    'tokens',
    'patterns',
    'a11y',
    'testing',
    'stories',
    'components',
    'roadmap',
  ];
  const entries = await Promise.all(
    names.map(async (name) => [name, await readSlice(name)] as const)
  );
  return Object.fromEntries(entries) as Record<SliceName, string>;
}

export async function getContextDir(): Promise<string> {
  return resolveContextDir();
}
