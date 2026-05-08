import { describe, it, expect } from 'vitest';
import { searchContext } from './searchContext.js';

describe('searchContext', () => {
  it('finds matches for a common term', async () => {
    const result = await searchContext({ query: 'forwardRef' });
    expect(result.isError).toBeUndefined();
    const text = result.content[0].text;
    expect(text).toContain('Found');
    expect(text).toContain('forwardRef');
    expect(text).toMatch(/\*\*\w+\.md:\d+\*\*/);
  });

  it('is case-insensitive', async () => {
    const lower = await searchContext({ query: 'forwardref' });
    const upper = await searchContext({ query: 'FORWARDREF' });
    expect(lower.content[0].text).toContain('Found');
    expect(upper.content[0].text).toContain('Found');
  });

  it('respects maxResults limit', async () => {
    const result = await searchContext({ query: 'stoked', maxResults: 3 });
    const text = result.content[0].text;
    const matchLines = text.split('\n').filter((l) => l.startsWith('**'));
    expect(matchLines.length).toBeLessThanOrEqual(3);
  });

  it('returns "no matches" message when query has no hits', async () => {
    const result = await searchContext({ query: 'zzzznevermatchzzz' });
    expect(result.isError).toBeUndefined();
    expect(result.content[0].text).toContain('No matches');
  });

  it('formats matches with slice name and line number', async () => {
    const result = await searchContext({ query: 'spacing', maxResults: 5 });
    const text = result.content[0].text;
    expect(text).toMatch(/\*\*\w+\.md:\d+\*\* — /);
  });

  it('uses default maxResults when not provided', async () => {
    const result = await searchContext({ query: 'stoked' });
    const text = result.content[0].text;
    const matchLines = text.split('\n').filter((l) => l.startsWith('**'));
    expect(matchLines.length).toBeLessThanOrEqual(20);
    expect(matchLines.length).toBeGreaterThan(0);
  });
});
