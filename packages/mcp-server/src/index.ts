#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from './server.js';

async function main(): Promise<void> {
  const server = createServer();
  const transport = new StdioServerTransport();

  const shutdown = async (signal: string): Promise<void> => {
    console.error(`[stoked-ds-mcp] received ${signal}, shutting down`);
    try {
      await server.close();
    } finally {
      process.exit(0);
    }
  };

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));

  await server.connect(transport);
  console.error('[stoked-ds-mcp] server connected on stdio');
}

main().catch((err) => {
  console.error('[stoked-ds-mcp] fatal error:', err);
  process.exit(1);
});
