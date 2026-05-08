import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { getComponent, getComponentSchema } from './tools/getComponent.js';
import { getTokens, getTokensSchema } from './tools/getTokens.js';
import { getPatterns, getPatternsSchema } from './tools/getPatterns.js';
import { searchContext, searchContextSchema } from './tools/searchContext.js';

export function createServer() {
  const server = new McpServer({
    name: 'stoked-ds',
    version: '0.1.0',
  });

  server.registerTool(
    'get_component',
    {
      title: 'Get component info',
      description:
        'Returns information about a stoked-ds component (description, source path, expected file structure). Use when the user asks about a specific component by name.',
      inputSchema: getComponentSchema,
    },
    getComponent,
  );

  server.registerTool(
    'get_tokens',
    {
      title: 'Get design tokens',
      description:
        'Returns design tokens for a category (colors, spacing, typography, borders, shadows, transitions, z-index, sizes) or all of them. Use when styling components or answering token questions.',
      inputSchema: getTokensSchema,
    },
    getTokens,
  );

  server.registerTool(
    'get_patterns',
    {
      title: 'Get component patterns',
      description:
        'Returns implementation patterns and conventions (file-structure, types, implementation, css, compound, exit-animation, controlled, utilities). Use when scaffolding or reviewing components.',
      inputSchema: getPatternsSchema,
    },
    getPatterns,
  );

  server.registerTool(
    'search_context',
    {
      title: 'Search design system context',
      description:
        'Full-text search across all .context/ slices (tokens, patterns, components, a11y, testing, stories, roadmap). Returns matching lines with their slice and line number.',
      inputSchema: searchContextSchema,
    },
    searchContext,
  );

  return server;
}
