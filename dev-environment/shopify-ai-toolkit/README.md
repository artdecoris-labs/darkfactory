# Shopify AI Toolkit — VS Code / Copilot path

> **This is an alternative, not the active path.** The work is being done in
> **Claude Code**, configured via the repo root `CLAUDE.md`, `.claude/skills/` and
> `.mcp.json`. See [ADR 0002](../../docs/adr/0002-claude-code-as-agent-environment.md).
>
> Keep this only if someone wants the VS Code + GitHub Copilot workflow.

The Shopify AI Toolkit is a VS Code chat plugin from Shopify providing documentation
search, API schema validation, and store management. The plugin installs per developer;
this folder holds shared templates for it.

## Contents

| File | Purpose |
| --- | --- |
| `.env.example` | Environment variable template. Copy to `.env` (gitignored). |
| `config.json` | Team configuration template — validation strictness, store execution policy. |

## Install the plugin

```text
Ctrl+Shift+P → Chat: Install Plugin From Source
https://github.com/Shopify/shopify-ai-toolkit
```

Requires the **Agent plugins** preview enabled in VS Code settings.

## Point it at this configuration

```powershell
$env:SHOPIFY_AI_TOOLKIT_CONFIG = 'C:\DevOps\darkfactory\dev-environment\shopify-ai-toolkit'
Copy-Item .env.example .env    # then fill in locally — never commit .env
```

## What happened to the custom skills

Earlier revisions of this folder documented two Node scripts, `validate-theme.mjs` and
`search-docs-custom.mjs`, in detail — including sample output. **Neither was ever
written.** They have been removed from the documentation rather than implemented,
because first-party tooling already covers what they described:

| Documented script | Use instead |
| --- | --- |
| `validate-theme.mjs` | `shopify theme check` with the theme repo's `.theme-check.yml` |
| `search-docs-custom.mjs` | the `shopify-dev` skill, or the Shopify Dev MCP server |

## Security

Both repositories are **public**. Never commit `.env`, a store handle, a theme ID, or an
API token. Review the scopes any AI connector requests before authorizing, and prefer
read-only access unless a write is specifically needed.

Official guidance: <https://help.shopify.com/en/manual/ai-powered-tools/connecting-ai-tools>
