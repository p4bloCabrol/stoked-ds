import { z } from 'zod';
import { readSlice } from '../lib/slices.js';

export const getComponentSchema = {
  name: z.string().min(1).describe('Component name in PascalCase, e.g. "Button", "Modal", "HierarchicalSelect"'),
};

export async function getComponent({ name }: { name: string }) {
  const components = await readSlice('components');

  const lines = components.split('\n');
  const match = lines.find((line) =>
    new RegExp(`\\|\\s*${escapeRegex(name)}\\s*\\|`, 'i').test(line)
  );

  if (!match) {
    return {
      isError: true,
      content: [
        {
          type: 'text' as const,
          text: `Component "${name}" not found in the stoked-ds inventory. Use the search_context tool to look up components by partial name or feature.`,
        },
      ],
    };
  }

  const description = match.split('|').map((c) => c.trim()).filter(Boolean)[1] ?? '';

  return {
    content: [
      {
        type: 'text' as const,
        text: [
          `# ${name}`,
          '',
          `**Description:** ${description}`,
          '',
          `**Source path:** \`src/components/${name}/\``,
          '',
          'Files in a stoked-ds component directory:',
          '- `' + name + '.tsx` — implementation (uses `forwardRef`, `data-*` attributes for variants)',
          '- `' + name + '.types.ts` — TypeScript types (extends `ComponentPropsWithoutRef<\'element\'>`)',
          '- `' + name + '.module.css` — CSS Modules with `var(--stoked-*)` tokens',
          '- `' + name + '.stories.tsx` — Storybook stories with `tags: [\'autodocs\']`',
          '- `' + name + '.test.tsx` — Vitest unit tests with `userEvent`',
          '- `index.ts` — re-exports component and types',
          '',
          'For implementation conventions, call `get_patterns`. For tokens, call `get_tokens`.',
        ].join('\n'),
      },
    ],
  };
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
