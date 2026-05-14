# @stoked-ds/mcp-server

A [Model Context Protocol](https://modelcontextprotocol.io) server that exposes the [stoked-ds](https://github.com/p4bloCabrol/stoked-ds) design system as agent tools. Lets AI assistants (Claude Desktop, Claude Code, Cursor, VS Code, Windsurf) query components, design tokens, patterns, and conventions on demand instead of loading a full context file upfront.

## Why

The stoked-ds repo ships a `.context/` directory with granular slices (tokens, patterns, components, a11y, testing, stories, roadmap). This server reads those slices and serves them as MCP tools so agents only pull the slice they need.

## Tools

| Tool | Description |
|------|-------------|
| `get_component(name)` | Returns info for a component by name (e.g. `Button`, `Modal`). |
| `get_tokens(category?)` | Returns design tokens for a category: `colors`, `spacing`, `typography`, `borders`, `shadows`, `transitions`, `z-index`, `sizes`, or `all`. |
| `get_patterns(topic?)` | Returns implementation patterns: `file-structure`, `types`, `implementation`, `css`, `compound`, `exit-animation`, `controlled`, `utilities`, or `all`. |
| `search_context(query, maxResults?)` | Full-text search across every slice. Returns matching lines with slice and line number. |

## Install & configure

The server runs over **stdio** and is invoked via `npx`. No global install required.

### Claude Desktop

Add to your config file (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS, `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "stoked-ds": {
      "command": "npx",
      "args": ["-y", "@stoked-ds/mcp-server"]
    }
  }
}
```

Restart Claude Desktop.

### Claude Code

```bash
claude mcp add stoked-ds -- npx -y @stoked-ds/mcp-server
```

Or commit a `.mcp.json` to your repo:

```json
{
  "mcpServers": {
    "stoked-ds": {
      "command": "npx",
      "args": ["-y", "@stoked-ds/mcp-server"]
    }
  }
}
```

### Cursor

Add to `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` (per project):

```json
{
  "mcpServers": {
    "stoked-ds": {
      "command": "npx",
      "args": ["-y", "@stoked-ds/mcp-server"]
    }
  }
}
```

### VS Code (Copilot agent mode)

```json
{
  "mcp.servers": {
    "stoked-ds": {
      "command": "npx",
      "args": ["-y", "@stoked-ds/mcp-server"]
    }
  }
}
```

## Try it out

Once configured, ask your assistant things like:

> "What design tokens does stoked-ds expose for spacing?"

> "How do I write tests for a stoked-ds component?"

> "Show me the CSS Module pattern used by stoked-ds."

> "Search the stoked-ds context for `forwardRef`."

The agent will pick the right tool automatically.

## Develop

This package is part of the [stoked-ds monorepo](https://github.com/p4bloCabrol/stoked-ds). To work on it locally:

```bash
git clone https://github.com/p4bloCabrol/stoked-ds.git
cd stoked-ds
pnpm install
pnpm --filter @stoked-ds/mcp-server build
```

> Uses [pnpm](https://pnpm.io) workspaces. Install pnpm globally with `npm install -g pnpm` or via Corepack: `corepack enable`.

### MCP Inspector

The fastest dev loop is the official [MCP Inspector](https://github.com/modelcontextprotocol/inspector):

```bash
pnpm --filter @stoked-ds/mcp-server inspector
```

Opens a localhost UI where you can list/call tools and inspect every JSON-RPC frame.

### Project layout

```
packages/mcp-server/
├── src/
│   ├── index.ts          # entry: shebang + stdio transport + graceful shutdown
│   ├── server.ts         # registers tools
│   ├── lib/
│   │   └── slices.ts     # reads & caches .context/*.md
│   └── tools/
│       ├── getComponent.ts
│       ├── getTokens.ts
│       ├── getPatterns.ts
│       └── searchContext.ts
├── scripts/
│   └── postbuild.mjs     # copies .context/ into dist/, chmod +x bin
└── package.json
```

The server resolves `.context/` from two locations, in order:
1. `dist/.context/` — bundled when published to npm
2. `<repo-root>/.context/` — used during local development from the monorepo

## License

MIT — see [LICENSE](../../LICENSE) at the repo root.
