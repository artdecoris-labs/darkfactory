# darkfactory — Art Decoris control plane

This repository is the **shared memory** for the Odoo → Shopify migration. It holds
conventions, decision records, skills and mappings. It holds **no store data and no
secrets**.

> **This repository is PUBLIC.** So is the theme repository. Never commit a store
> handle, theme ID, API token, customer record, or order export. Real values live in
> gitignored files (`secrets/`, `.env`, `shopify.theme.toml`) and in Shopify admin.

## Where are we?

`docs/migration-plan.md` is the plan of record — completed phases, confirmed facts,
remaining work, and open items. Read it before starting anything, and update it when a
phase completes.

## The repositories

| Path | Role |
| --- | --- |
| `C:\DevOps\darkfactory` | This repo. Conventions, ADRs, skills, migration mappings, design handoff. |
| `C:\DevOps\artdecoris-shop-theme-00` | Shopify storefront. Near-stock Horizon 4.1.4. |
| `C:\DevOps\artdecoris-shop-design-system` | Design handoff — artboard, design tokens, brand imagery. |
| `C:\DevOps\artdecoris-odoo-migration` | Odoo → Shopify ETL. *(Phase B — not created yet.)* |

## Theme branch workflow

- `stage` — unpublished Shopify theme. **All development happens here.**
- `main` — published live theme. Reached only through a reviewed PR from `stage`.

Publishing is always a separate, explicit release action. Never let Shopify CLI or an
MCP tool publish `stage` as a side effect of anything.

The theme is deliberately kept close to stock Horizon so upstream upgrades stay
nearly conflict-free. Prefer theme settings, presets and blocks over editing vendor
files. When a vendor file must change, keep the diff minimal and say why in the commit.

Theme-editor changes made in Shopify admin are **not** authoritative — either pull them
back into git deliberately or discard them.

## Migration pipeline

Extract → stage → **evaluate (human gate)** → load. Details in
`docs/migration-mapping.md`. Two rules that are not negotiable:

1. **Nothing loads before an evaluation run passes.** The gate exists because a
   half-completed catalog load is far more expensive to undo than to prevent.
2. **Every record created in Shopify carries an `odoo.id` metafield.** Re-running a
   load must update, never duplicate.

## Tooling in this environment

- **Claude Code** with the official `shopify-plugin` skills (Liquid, Admin GraphQL,
  CLI execution, custom data). This is the active path.
- **Shopify CLI** for preview, validation and store reads.
- **Shopify Dev MCP** (`.mcp.json`) for schema introspection when authoring GraphQL.
- MCP and skills are for **authoring, reconnaissance and spot-checks**. They are never
  in the bulk data path — see `docs/adr/0003-mcp-scope.md`.

`dev-environment/` also documents a VS Code + Copilot path. That is an alternative,
not what these skills assume.

## Local skills

`.claude/skills/` — `store-facts`, `theme-release`, `design-handoff`, `migration-run`.
