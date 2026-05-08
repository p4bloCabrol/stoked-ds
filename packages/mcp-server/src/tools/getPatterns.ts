import { z } from 'zod';
import { readSlice } from '../lib/slices.js';

const TOPICS = [
  'file-structure',
  'types',
  'implementation',
  'css',
  'compound',
  'exit-animation',
  'controlled',
  'utilities',
  'all',
] as const;

export const getPatternsSchema = {
  topic: z
    .enum(TOPICS)
    .optional()
    .describe('Specific pattern topic. Omit or use "all" to get every pattern.'),
};

export async function getPatterns({ topic }: { topic?: (typeof TOPICS)[number] }) {
  const patterns = await readSlice('patterns');
  const t = topic ?? 'all';

  if (t === 'all') {
    return {
      content: [{ type: 'text' as const, text: patterns }],
    };
  }

  const headingMap: Record<Exclude<(typeof TOPICS)[number], 'all'>, string> = {
    'file-structure': '## File structure',
    types: '## Types pattern',
    implementation: '## Component implementation pattern',
    css: '## CSS Module pattern',
    compound: '## Compound components pattern',
    'exit-animation': '## Exit animations pattern',
    controlled: '## Controlled/Uncontrolled pattern',
    utilities: '## Available utilities',
  };

  const heading = headingMap[t];
  const section = extractSection(patterns, heading);

  if (!section) {
    return {
      isError: true,
      content: [
        { type: 'text' as const, text: `Section "${heading}" not found in patterns slice.` },
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
