import { describe, it, expect } from 'vitest';
import { getPatterns } from './getPatterns.js';

describe('getPatterns', () => {
  it('returns full patterns slice when no topic given', async () => {
    const result = await getPatterns({});
    expect(result.isError).toBeUndefined();
    const text = result.content[0].text;
    expect(text).toContain('## File structure');
    expect(text).toContain('## Types pattern');
  });

  it('returns full slice when topic="all"', async () => {
    const result = await getPatterns({ topic: 'all' });
    expect(result.content[0].text).toContain('## File structure');
  });

  it('returns only file-structure section', async () => {
    const result = await getPatterns({ topic: 'file-structure' });
    const text = result.content[0].text;
    expect(text).toContain('## File structure');
    expect(text).toContain('ComponentName.tsx');
    expect(text).not.toContain('## Types pattern');
  });

  it('returns implementation pattern section', async () => {
    const result = await getPatterns({ topic: 'implementation' });
    const text = result.content[0].text;
    expect(text).toContain('forwardRef');
    expect(text).toContain('displayName');
  });

  it('returns CSS module pattern section', async () => {
    const result = await getPatterns({ topic: 'css' });
    const text = result.content[0].text;
    expect(text).toContain('## CSS Module pattern');
    expect(text).toContain('--_comp-');
  });

  it('returns compound components section', async () => {
    const result = await getPatterns({ topic: 'compound' });
    const text = result.content[0].text;
    expect(text).toContain('## Compound');
    expect(text).toContain('createContext');
  });

  it('returns utilities section', async () => {
    const result = await getPatterns({ topic: 'utilities' });
    const text = result.content[0].text;
    expect(text).toContain('## Available utilities');
    expect(text).toContain('cn()');
    expect(text).toContain('useExitAnimation');
  });
});
