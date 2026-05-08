import { describe, it, expect } from 'vitest';
import { getComponent } from './getComponent.js';

describe('getComponent', () => {
  it('returns info for a known component (Button)', async () => {
    const result = await getComponent({ name: 'Button' });
    expect(result.isError).toBeUndefined();
    expect(result.content[0].type).toBe('text');
    const text = result.content[0].text;
    expect(text).toContain('# Button');
    expect(text).toContain('src/components/Button/');
    expect(text).toContain('Button.tsx');
    expect(text).toContain('Button.types.ts');
    expect(text).toContain('Button.module.css');
  });

  it('returns info for a multi-word component (HierarchicalSelect)', async () => {
    const result = await getComponent({ name: 'HierarchicalSelect' });
    expect(result.isError).toBeUndefined();
    expect(result.content[0].text).toContain('# HierarchicalSelect');
  });

  it('is case-insensitive when matching', async () => {
    const result = await getComponent({ name: 'button' });
    expect(result.isError).toBeUndefined();
    expect(result.content[0].text).toContain('# button');
  });

  it('returns isError=true for unknown component', async () => {
    const result = await getComponent({ name: 'NonExistentWidget' });
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('not found');
    expect(result.content[0].text).toContain('search_context');
  });

  it('does not match partial substrings (e.g. "Butt")', async () => {
    const result = await getComponent({ name: 'Butt' });
    expect(result.isError).toBe(true);
  });
});
