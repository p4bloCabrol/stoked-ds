import { z } from 'zod';
import { readSlice } from '../lib/slices.js';

const CATEGORIES = [
  'colors',
  'spacing',
  'typography',
  'borders',
  'shadows',
  'transitions',
  'z-index',
  'sizes',
  'all',
] as const;

export const getTokensSchema = {
  category: z
    .enum(CATEGORIES)
    .optional()
    .describe('Token category to retrieve. Omit or use "all" to get every category.'),
};

export async function getTokens({ category }: { category?: (typeof CATEGORIES)[number] }) {
  const tokens = await readSlice('tokens');
  const cat = category ?? 'all';

  if (cat === 'all') {
    return {
      content: [{ type: 'text' as const, text: tokens }],
    };
  }

  const sectionMap: Record<Exclude<(typeof CATEGORIES)[number], 'all'>, string> = {
    colors: '## Colors',
    spacing: '## Spacing',
    typography: '## Typography',
    borders: '## Borders',
    shadows: '## Shadows',
    transitions: '## Transitions',
    'z-index': '## Z-Index',
    sizes: '## Size system',
  };

  const heading = sectionMap[cat];
  const section = extractSection(tokens, heading);

  if (!section) {
    return {
      isError: true,
      content: [
        { type: 'text' as const, text: `Section "${heading}" not found in tokens slice.` },
      ],
    };
  }

  return {
    content: [{ type: 'text' as const, text: section }],
  };
}

function extractSection(markdown: string, heading: string): string | null {
  const lines = markdown.split('\n');
  const start = lines.findIndex((line) => line.trim().startsWith(heading));
  if (start === -1) return null;

  const end = lines.findIndex((line, i) => i > start && /^##\s/.test(line));
  const slice = end === -1 ? lines.slice(start) : lines.slice(start, end);
  return slice.join('\n').trim();
}
