# darkfactory

Control plane and shared memory for the **Art Decoris Odoo → Shopify migration**.

Conventions, decision records, agent skills and migration mappings live here. Store
data and secrets do not — **this repository is public**.

## Repositories

| Repo | Role |
| --- | --- |
| **darkfactory** (this) | Conventions, ADRs, skills, migration mapping, design handoff |
| [`artdecoris-shop-theme-00`](https://github.com/artdecoris-labs/artdecoris-shop-theme-00) | Shopify storefront — near-stock Horizon 4.1.4, `stage` → `main` |
| `artdecoris-odoo-migration` | Odoo → Shopify ETL *(not created yet — Phase 2)* |

## Start here

- **[`CLAUDE.md`](CLAUDE.md)** — the operating contract. Read this first.
- **[`docs/adr/`](docs/adr/)** — why things are the way they are.
- **[`docs/migration-mapping.md`](docs/migration-mapping.md)** — Odoo → Shopify field contract.
- **[`dev-environment/`](dev-environment/)** — tool setup.

## Skills

`.claude/skills/` — loaded automatically by Claude Code in this directory.

| Skill | Use it when |
| --- | --- |
| `store-facts` | You need the store handle or a theme ID |
| `theme-release` | Promoting `stage` → `main` |
| `design-handoff` | Importing the Claude Design canvas into the theme |
| `migration-run` | Running extract / evaluate / load |

## The one rule

Both repositories are public. Store handles, theme IDs, API tokens, customer records and
order exports never get committed. Real values live in gitignored files — see
[`secrets/README.md`](secrets/README.md).
