import { describe, it, expect } from 'vitest';
import { getTokens } from './getTokens.js';

describe('getTokens', () => {
  it('returns full tokens slice when no category given', async () => {
    const result = await getTokens({});
    expect(result.isError).toBeUndefined();
    const text = result.content[0].text;
    expect(text).toContain('## Colors');
    expect(text).toContain('## Spacing');
    expect(text).toContain('## Typography');
  });

  it('returns full slice when category="all"', async () => {
    const result = await getTokens({ category: 'all' });
    const text = result.content[0].text;
    expect(text).toContain('## Colors');
    expect(text).toContain('## Spacing');
  });

  it('returns only the colors section when category="colors"', async () => {
    const result = await getTokens({ category: 'colors' });
    const text = result.content[0].text;
    expect(text).toContain('## Colors');
    expect(text).toContain('--stoked-color-primary');
    expect(text).not.toContain('## Spacing');
    expect(text).not.toContain('## Typography');
  });

  it('returns only spacing section when category="spacing"', async () => {
    const result = await getTokens({ category: 'spacing' });
    const text = result.content[0].text;
    expect(text).toContain('## Spacing');
    expect(text).toContain('--stoked-spacing-4');
    expect(text).not.toContain('## Colors');
  });

  it('handles z-index category (with hyphen)', async () => {
    const result = await getTokens({ category: 'z-index' });
    const text = result.content[0].text;
    expect(text).toContain('## Z-Index');
    expect(text).toContain('--stoked-z-modal');
  });

  it('returns sizes section', async () => {
    const result = await getTokens({ category: 'sizes' });
    const text = result.content[0].text;
    expect(text).toContain('## Size system');
  });
});
