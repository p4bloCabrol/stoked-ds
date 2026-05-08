# stoked-ds — Roadmap

## Phase 1: Foundation (v0.1–v0.3) — COMPLETED
30 components, 214 tokens, dark/light themes, 5 integrations, Storybook docs, landing page.

## Phase 2: Hardening & Visibility (v0.4) — COMPLETED
Trusted Publishers (OIDC), provenance, CycloneDX SBOM, npm audit in CI, Dependabot, SEO, README badges, white paper.

## Phase 3: High-Demand Components (v0.5) — IN PROGRESS

| Component | Status |
|-----------|--------|
| HierarchicalSelect | Done |
| MultiSelect (pills) | Done |
| Stepper | Done |
| TreeView | Pending |
| CommandPalette | Pending |
| Transfer | Pending |

## Phase 4: Headless Mode (v0.6)
Behavior-only primitives, dual export (styled + headless), custom theming.

## Phase 5: Premium Integrations (v0.7)
TipTap, AG Grid, React DnD Kit, Uppy.

## Phase 6: DX & Ecosystem (v1.0) — ACCELERATED
- **Context slicing** (`.context/` directory) — DONE
- **MCP Server** (`@stoked-ds/mcp-server`) — DONE. Tools: `get_component`, `get_tokens`, `get_patterns`, `search_context`. Lives at `packages/mcp-server/`.
- CLI scaffolding
- Figma token sync
- React Flow integration
- Stable public API

## Quality pipeline (all PRs)

```
lint → typecheck → test → test:e2e → build
```

Publish adds: quality checks → tarball validation → CycloneDX SBOM → `npm publish --provenance`
