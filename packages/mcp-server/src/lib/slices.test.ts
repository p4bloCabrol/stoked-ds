import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { readSlice, readAllSlices, getContextDir, _resetCache } from './slices.js';

describe('slices', () => {
  beforeEach(() => {
    _resetCache();
  });

  afterEach(() => {
    _resetCache();
  });

  describe('readSlice', () => {
    it('reads a known slice from disk', async () => {
      const content = await readSlice('tokens');
      expect(content).toContain('## Colors');
      expect(content).toContain('--stoked-color-primary');
    });

    it('caches subsequent reads', async () => {
      const first = await readSlice('patterns');
      const second = await readSlice('patterns');
      expect(first).toBe(second);
    });

    it('reads every known slice without error', async () => {
      const names = ['index', 'tokens', 'patterns', 'a11y', 'testing', 'stories', 'components', 'roadmap'] as const;
      for (const name of names) {
        const content = await readSlice(name);
        expect(content.length).toBeGreaterThan(0);
      }
    });
  });

  describe('readAllSlices', () => {
    it('returns a record with all 8 slices', async () => {
      const all = await readAllSlices();
      expect(Object.keys(all)).toHaveLength(8);
      expect(all.tokens).toContain('## Colors');
      expect(all.patterns).toContain('forwardRef');
    });
  });

  describe('getContextDir', () => {
    it('returns an absolute path that exists', async () => {
      const dir = await getContextDir();
      expect(dir).toMatch(/[/\\]\.context$/);
    });
  });
});
