# Security audit — Shai-Hulud 2.0 / Mini Shai-Hulud npm supply-chain attack

**Audited on:** 2026-05-14
**Auditor:** repo maintainer
**Status:** stoked-ds NOT affected

## Attack overview

On **2026-05-11 from 19:20 to 19:26 UTC**, the threat group "TeamPCP" (Mini Shai-Hulud campaign) published malicious versions across **~170 npm packages** (~404 malicious versions) in a coordinated supply-chain attack. The attack vector exploited GitHub Actions `pull_request_target` workflows combined with cache poisoning and OIDC token extraction from runner process memory.

Affected ecosystems include:

- `@tanstack/*` — 42 packages, 84 versions (router, start, history, devtools, plugin, ssr-query, generator, etc.)
- `@mistralai/*` — Mistral AI TypeScript clients
- `@uipath/*` — 77 packages (enterprise automation tooling)
- Bitwarden CLI, `guardrails-ai`, several other unscoped packages
- Full list: see Wiz, Snyk, and TanStack postmortem references below

## Audit method

`package-lock.json` was grepped against the full list of compromised package names and version ranges published by Wiz, Snyk, and TanStack.

## stoked-ds direct exposure

| Package in our deps | Compromised? | Notes |
|---------------------|--------------|-------|
| `@tanstack/react-table@8.21.3` | **No** | TanStack postmortem explicitly lists `@tanstack/table*` family as clean. |
| `@tanstack/table-core@8.21.3` (transitive) | **No** | Same family as above. |
| `@modelcontextprotocol/sdk@1.29.0` | **No** | Not in any compromised list. |
| `react-hook-form`, `react-day-picker`, `react-select`, `recharts` | **No** | Not in any compromised list. |
| `vite`, `vitest`, `storybook`, `eslint`, `zod`, `clsx` | **No** | Not in any compromised list. |

Cross-check commands run:

```bash
grep -E '"@(tanstack|mistralai|uipath|sap|cap-js|dirigible-ai|draftauth|draftlab|mesadev|ml-toolkit-ts|opensearch-project|squawk|supersurkhet|tallyui|taskflow-corp|tolka|beproduct)/' package-lock.json
# only @tanstack/react-table (clean family) matched

grep -E '"(agentwork-cli|cmux-agent-mcp|cross-stitch|git-branch-selector|git-git-git|guardrails-ai|intercom-client|lightning|mbt|mistralai|nextmove-mcp|safe-action|ts-dna|wot-api)"' package-lock.json
# no matches
```

## Downstream consumer exposure

`stoked-ds` declares `@tanstack/react-table` as a **peerDependency** (optional) and **devDependency** only — it is NOT bundled in the published tarball. Consumers install TanStack on their own. Even if a downstream consumer's lockfile pinned a compromised TanStack version, `stoked-ds` itself does not propagate it.

The published `stoked-ds@0.6.0` tarball was inspected and contains only `dist/`, `README.md`, `LICENSE`, `CHANGELOG.md`. No TanStack code is shipped.

## Verdict

**stoked-ds and @stoked-ds/mcp-server are NOT affected by the Mini Shai-Hulud attack.**

No rotation of credentials or republishing of stoked-ds is required as a result of this incident. The repo's existing supply-chain hardening (lockfile-based installs in CI, Trusted Publishers/OIDC, npm audit in CI, Socket Security, Dependabot, provenance attestation) remains the appropriate defense posture.

## Defensive follow-ups (independent of this audit)

- Migration from `npm` to `pnpm` is being evaluated separately. Note: this does not protect against the same attack vector — pnpm downloads from the same npm registry. The benefits are tangential (stricter linking, faster installs, smaller `node_modules`).
- `npm audit signatures` currently fails locally due to a TLS interception in the maintainer's network (`UNABLE_TO_VERIFY_LEAF_SIGNATURE` against `tuf-repo-cdn.sigstore.dev`). Resolving this would let us verify package signatures on every install. Unrelated to the attack.
- Continuing to use `npm ci` / `pnpm install --frozen-lockfile` in CI, as today.

## References

- TanStack postmortem: https://tanstack.com/blog/npm-supply-chain-compromise-postmortem
- TanStack incident follow-up & hardening: https://tanstack.com/blog/incident-followup
- Wiz analysis: https://www.wiz.io/blog/mini-shai-hulud-strikes-again-tanstack-more-npm-packages-compromised
- Endor Labs: https://www.endorlabs.com/learn/shai-hulud-compromises-the-tanstack-ecosystem-80-packages-compromised
- Snyk advisory: https://snyk.io/blog/tanstack-npm-packages-compromised/
- Hispasec (Spanish): https://unaaldia.hispasec.com/2026/05/shai-hulud-ataque-a-la-cadena-de-suministro-compromete-cientos-de-paquetes-en-npm-y-pypi.html
- StepSecurity: https://www.stepsecurity.io/blog/mini-shai-hulud-is-back-a-self-spreading-supply-chain-attack-hits-the-npm-ecosystem
- The Hacker News: https://thehackernews.com/2026/05/mini-shai-hulud-worm-compromises.html
- GitHub Security Advisory: GHSA-g7cv-rxg3-hmpx (TanStack)
