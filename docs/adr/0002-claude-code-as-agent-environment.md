# ADR 0002: Claude Code is the agent environment

**Status:** Accepted · **Date:** 2026-08-26 · Supersedes the tooling assumption in
[ADR 0001](0001-shopify-ai-toolkit-layering.md).

## Context

ADR 0001 and `dev-environment/` describe a VS Code + GitHub Copilot workflow built
around the Shopify AI Toolkit Copilot plugin, with team configuration in
`dev-environment/shopify-ai-toolkit/` selected by a `SHOPIFY_AI_TOOLKIT_CONFIG`
environment variable.

The work is actually being done in **Claude Code**, which:

- already has the official `shopify-plugin` skills installed (`shopify-liquid`,
  `shopify-admin`, `shopify-use-shopify-cli`, `shopify-custom-data`, and others);
- reads `CLAUDE.md`, `.claude/skills/`, `.claude/settings.json` and `.mcp.json`;
- does **not** read `config.json` or `SHOPIFY_AI_TOOLKIT_CONFIG`.

Two custom skills documented in detail under `custom-skills/` — `validate-theme.mjs`
and `search-docs-custom.mjs`, complete with sample output — were never written. The
documentation described software that did not exist.

## Decision

Claude Code is the primary agent environment. Its configuration lives in this repo's
`CLAUDE.md`, `.claude/skills/` and `.mcp.json`.

The documented-but-unwritten `.mjs` custom skills are **removed from the docs rather
than implemented**. Their stated purposes are already covered:

| Documented script | Actually provided by |
| --- | --- |
| `validate-theme.mjs` | `shopify theme check` + `.theme-check.yml` |
| `search-docs-custom.mjs` | the `shopify-dev` skill and the Shopify Dev MCP server |

The VS Code + Copilot path stays documented in `dev-environment/` as a valid
alternative for anyone who prefers it. It is not what the skills in this repo assume.

## Consequences

- One source of truth for agent behaviour, in a form the agent actually loads.
- No maintenance burden for wrapper scripts duplicating first-party tooling.
- `config.json` and `.env.example` under `dev-environment/shopify-ai-toolkit/` remain
  as templates for the Copilot path only, and are not authoritative.
