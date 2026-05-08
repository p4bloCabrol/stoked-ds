import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createServer } from './server.js';

describe('MCP server (in-process integration)', () => {
  let client: Client;
  let server: ReturnType<typeof createServer>;

  beforeAll(async () => {
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

    server = createServer();
    await server.connect(serverTransport);

    client = new Client({ name: 'test-client', version: '1.0.0' });
    await client.connect(clientTransport);
  });

  afterAll(async () => {
    await client.close();
    await server.close();
  });

  describe('tools/list', () => {
    it('exposes exactly 4 tools', async () => {
      const result = await client.listTools();
      expect(result.tools).toHaveLength(4);
    });

    it('lists the expected tool names', async () => {
      const result = await client.listTools();
      const names = result.tools.map((t) => t.name).sort();
      expect(names).toEqual(['get_component', 'get_patterns', 'get_tokens', 'search_context']);
    });

    it('every tool has a description and inputSchema', async () => {
      const result = await client.listTools();
      for (const tool of result.tools) {
        expect(tool.description).toBeTruthy();
        expect(tool.inputSchema).toBeTruthy();
        expect(tool.inputSchema.type).toBe('object');
      }
    });
  });

  describe('tools/call: get_component', () => {
    it('returns content for a known component', async () => {
      const result = await client.callTool({ name: 'get_component', arguments: { name: 'Button' } });
      expect(result.isError).toBeFalsy();
      expect(Array.isArray(result.content)).toBe(true);
      const content = result.content as Array<{ type: string; text: string }>;
      expect(content[0].type).toBe('text');
      expect(content[0].text).toContain('# Button');
    });

    it('returns isError=true for unknown component', async () => {
      const result = await client.callTool({
        name: 'get_component',
        arguments: { name: 'TotallyMadeUp' },
      });
      expect(result.isError).toBe(true);
    });

    it('returns isError=true for invalid arguments (missing name)', async () => {
      const result = await client.callTool({ name: 'get_component', arguments: {} });
      expect(result.isError).toBe(true);
    });
  });

  describe('tools/call: get_tokens', () => {
    it('returns full slice when no category given', async () => {
      const result = await client.callTool({ name: 'get_tokens', arguments: {} });
      const content = result.content as Array<{ type: string; text: string }>;
      expect(content[0].text).toContain('## Colors');
      expect(content[0].text).toContain('## Spacing');
    });

    it('returns only the requested category', async () => {
      const result = await client.callTool({
        name: 'get_tokens',
        arguments: { category: 'spacing' },
      });
      const content = result.content as Array<{ type: string; text: string }>;
      expect(content[0].text).toContain('## Spacing');
      expect(content[0].text).not.toContain('## Colors');
    });

    it('returns isError=true for invalid category', async () => {
      const result = await client.callTool({
        name: 'get_tokens',
        arguments: { category: 'invalid' },
      });
      expect(result.isError).toBe(true);
    });
  });

  describe('tools/call: get_patterns', () => {
    it('returns full slice when no topic given', async () => {
      const result = await client.callTool({ name: 'get_patterns', arguments: {} });
      const content = result.content as Array<{ type: string; text: string }>;
      expect(content[0].text).toContain('## File structure');
    });

    it('returns the requested topic only', async () => {
      const result = await client.callTool({
        name: 'get_patterns',
        arguments: { topic: 'css' },
      });
      const content = result.content as Array<{ type: string; text: string }>;
      expect(content[0].text).toContain('## CSS Module pattern');
    });
  });

  describe('tools/call: search_context', () => {
    it('returns matches for a known term', async () => {
      const result = await client.callTool({
        name: 'search_context',
        arguments: { query: 'forwardRef' },
      });
      const content = result.content as Array<{ type: string; text: string }>;
      expect(content[0].text).toContain('Found');
      expect(content[0].text).toContain('forwardRef');
    });

    it('returns isError=true for queries shorter than 2 chars', async () => {
      const result = await client.callTool({
        name: 'search_context',
        arguments: { query: 'a' },
      });
      expect(result.isError).toBe(true);
    });

    it('returns isError=true when maxResults > 50', async () => {
      const result = await client.callTool({
        name: 'search_context',
        arguments: { query: 'stoked', maxResults: 100 },
      });
      expect(result.isError).toBe(true);
    });
  });

  describe('error handling', () => {
    it('returns isError=true for calls to unknown tools', async () => {
      const result = await client.callTool({
        name: 'nonexistent_tool',
        arguments: {},
      });
      expect(result.isError).toBe(true);
      const content = result.content as Array<{ type: string; text: string }>;
      expect(content[0].text).toContain('not found');
    });
  });
});
