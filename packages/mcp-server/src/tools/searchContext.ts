import { z } from 'zod';
import { readAllSlices, type SliceName } from '../lib/slices.js';

export const searchContextSchema = {
  query: z
    .string()
    .min(2)
    .describe('Search query. Matches are case-insensitive substring matches across all .context/ slices.'),
  maxResults: z
    .number()
    .int()
    .min(1)
    .max(50)
    .optional()
    .describe('Maximum number of matching lines to return. Default 20.'),
};

export async function searchContext({
  query,
  maxResults = 20,
}: {
  query: string;
  maxResults?: number;
}) {
  const slices = await readAllSlices();
  const needle = query.toLowerCase();

  type Match = { slice: SliceName; line: number; text: string };
  const matches: Match[] = [];

  for (const [slice, content] of Object.entries(slices) as [SliceName, string][]) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].toLowerCase().includes(needle)) {
        matches.push({ slice, line: i + 1, text: lines[i].trim() });
        if (matches.length >= maxResults) break;
      }
    }
    if (matches.length >= maxResults) break;
  }

  if (matches.length === 0) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `No matches for "${query}" in .context/ slices.`,
        },
      ],
    };
  }

  const formatted = matches
    .map((m) => `**${m.slice}.md:${m.line}** — ${m.text}`)
    .join('\n');

  return {
    content: [
      {
        type: 'text' as const,
        text: `Found ${matches.length} match${matches.length === 1 ? '' : 'es'} for "${query}":\n\n${formatted}`,
      },
    ],
  };
}
