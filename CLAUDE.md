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

- `stage` → Shopify theme *artdecoris-shop-theme-00/stage*, **unpublished**. All
  development happens here.
- `main` → Shopify theme *artdecoris-shop-theme-00/main*, **also unpublished**.
  Reached only through a reviewed PR from `stage`.

> **Neither branch serves the live storefront.** The published theme is a separate
> *Horizon* theme that is **not connected to this repository**. Nothing merged to
> `main` reaches customers until that branch's theme is explicitly published — a
> deliberate launch step, not part of the normal flow. Theme IDs live in the gitignored
> `shopify.theme.toml`.

### The five gates

```
local edit ─▶ ① validate local ─▶ ② push stage ─▶ ③ validate admin ─▶ ④ PR to main ─▶ ⑤ go live
  (stage)      theme check +        auto-syncs      preview stage       review diff     publish
               theme dev            to stage theme  theme in admin                      main theme
```

Each gate must pass before the next. Full detail in the `theme-release` skill.

Until go-live the built-in *Horizon* theme stays published and `main` is preview-only.
Publishing the `main` theme is a single deliberate launch action — and the old *Horizon*
theme is kept afterwards as the instant rollback.

> **⚠ The GitHub integration is two-way.** Edits made in the Shopify theme editor are
> committed back to the connected branch automatically. Previewing in admin is
> **look-don't-edit**: editing the `stage` theme silently puts your local clone behind
> (`git pull` before resuming), and editing the `main` theme bypasses the PR gate
> entirely. Never customize the `main` theme in admin.

Publishing is always a separate, explicit release action. Never let Shopify CLI or an
MCP tool publish a theme as a side effect of anything.

`shopify theme dev` creates a throwaway **development theme** for previewing your local
working copy. It is not a branch, touches no connected theme, and needs no git
counterpart.

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
