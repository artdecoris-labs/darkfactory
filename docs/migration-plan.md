# Odoo → Shopify Migration — Plan of Record

**Living document.** Update it as phases complete — it is the shared answer to "where are we?".
Last updated: 2026-08-26.

## Context

Art Decoris is migrating from an Odoo shop (<https://www.artdecoris.com>) to Shopify.
The original plan verified what existed under `C:\DevOps` and defined a three-repo
structure. **Phases 0 and 1 are now complete and pushed.** This revision records what was
actually found and built, and re-sequences the remaining work.

Two things changed the sequencing since the first draft:

- The **design handoff arrived complete** as a zip in the design-system repo, so it no
  longer depends on `/design-login` or a live Design API read. Design work is unblocked
  **now**.
- The **Odoo instance was probed successfully**, confirming version, hosting and
  database. Only a user + API key is still missing, which blocks the ETL and nothing else.

So design translation moves ahead of the migration build.

**This plan is itself a deliverable:** it gets committed to
`darkfactory/docs/migration-plan.md` as a living document, since darkfactory is the
control plane.

---

## Completed and pushed

| Repo | Branch | Head | State |
| --- | --- | --- | --- |
| `darkfactory` | `main` | `e3c64dc` | Control plane established |
| `artdecoris-shop-theme-00` | `stage` | `f270006` | 1 commit ahead of `main`, **PR pending** |
| `artdecoris-shop-design-system` | `main` | `6735a4e` | Real imagery in place |

**Phase 0 — foundations.** The theme repo's local clone was stale, not broken: GitHub
`main` was already at `3b8e3e6` from two merged PRs. Fetched and fast-forwarded; `main`
holds all 483 files.

`blocks/_header-logo.liquid` fixed. The real defect was subtler than the forced square
aspect: the fallback `<img>` never received the `--header-logo-image-*` custom properties
that `.header-logo__image` depends on, so those declarations resolved to nothing and the
element fell back to its HTML `width`/`height` attributes, ignoring `logo_height_mobile`
entirely. Both branches now render identically. The dead
`header-logo__image--prototype` class (no matching rule anywhere) was removed.

`.theme-check.yml` added — **300 files, no offenses**. `shopify.theme.toml.example`
committed; the real toml is gitignored.

**Phase 1 — control plane.** `CLAUDE.md`, `.mcp.json` (Shopify Dev MCP), four skills
(`store-facts`, `theme-release`, `design-handoff`, `migration-run`), ADRs 0001–0004,
`docs/migration-mapping.md`, logo adopted to `brand/artdecoris-logo.png`.

`dev-environment/shopify-ai-toolkit/custom-skills/` was **deleted**: it documented
`validate-theme.mjs` and `search-docs-custom.mjs` in detail, including sample output, and
neither was ever written. `shopify theme check` and the `shopify-dev` skill already cover
what they claimed. Recorded in ADR 0002.

**Imagery.** All 21 design assets were placeholder cards ("Drop brand photography
into…") rendered at correct dimensions. Replaced with real images pulled from the live
Odoo shop. Only `logo.png` had been real.

---

## Confirmed facts

| | |
| --- | --- |
| Odoo version | **18.0+e — Enterprise** (via `/web/webclient/version_info`) |
| Odoo hosting | **Odoo.sh** (via `Server:` header) |
| Odoo XML-RPC | `/xmlrpc/2/common` + `/xmlrpc/2/object` both reachable |
| Odoo database | recorded in gitignored `secrets/odoo.local.env` |
| Shopify store | handle + theme IDs in gitignored `shopify.theme.toml` |
| Live theme | a separate **Horizon** theme, **not** connected to this repo. Both branch themes are unpublished — nothing merged to `main` reaches customers until that theme is published at launch. |
| Theme baseline | stock Horizon **4.1.4**, one intentional customization |
| Design handoff | complete zip in `artdecoris-shop-design-system` |

**Security posture:** all three repos are **public**. Store handle, theme IDs, Odoo DB
name and tokens live only in gitignored files. Every commit this session was scanned for
them before pushing; all clean.

---

## Decisions

| Question | Decision |
| --- | --- |
| Odoo access | XML-RPC, **API key auth** (password fails under Odoo.sh 2FA) |
| Migration stack | Python extract → neutral staging → Node load |
| Pipeline shape | E → T → **Evaluate (human gate)** → L |
| Shopify MCP | Authoring, recon, spot-checks only — never in the bulk data path (ADR 0003) |
| Plan location | `darkfactory/docs/migration-plan.md`, living document |
| **Dev store rehearsal** | **Skipped — load directly to the real store** (see below) |
| Next work | Design handoff → theme |

### Loading straight to the real store

The dev-store rehearsal is skipped by decision. This is workable **only while the Shopify
store is still empty and unlaunched**, and it makes three existing safeguards
load-bearing rather than merely nice to have:

1. **The evaluation gate is now the only pre-flight check.** It must pass before any
   load, and `--force` should not be used.
2. **`--dry-run` first, every single time**, reviewing the planned-changes diff.
3. **Load in small batches by category**, verifying each before proceeding, rather than
   one bulk run.

Additional compensating control: before the first load, capture a full product/collection
export from the Shopify store so there is a known-good state to compare against. If the
store gains real orders before the catalog load happens, revisit this decision.

---

## Remaining work

### Phase A — Design handoff → theme *(next, unblocked)*

1. Extract `Shopify migration UX design-handoff.zip` and archive into
   `darkfactory/design/handoff/2026-08-26/` with a `SOURCE.md` recording project URL and
   date. Contents: `ArtDecoris Shopify Storefront.dc.html` (54 KB artboard),
   `ds/tokens/{base,colors,elevation,fonts,motion,radius,spacing,typography}.css`,
   `ds/styles.css`, `support.js`, `_ds/` bundle, assets.
2. Read the token CSS first — that is the layer that maps cleanly onto theme settings.
3. Translate, stopping at the first layer that can express the design:
   - **`config/settings_data.json`** — palette, `type_*_font`, heading scale,
     `page_width`, radii, `logo_height`. Most of the brand lands here. Currently pure
     stock Horizon: white/black, Inter, `page_width: narrow`.
   - **Section/block presets** — layout and composition.
   - **A thin custom CSS layer** — only what settings genuinely cannot express.
4. Do **not** rewrite Horizon vendor CSS. The near-stock baseline is deliberate and keeps
   upstream upgrades cheap.
5. Replace the `_header-logo.liquid` prototype fallback by uploading the real logo
   (`brand/artdecoris-logo.png`, or the 350×293 design-system `logo.png`) into
   `settings.logo`, then delete the fallback branch.

Work on `stage`. Follow the `design-handoff` skill.

### Phase B — Migration repo + Odoo extract *(blocked on API key)*

Scaffold `artdecoris-odoo-migration`; create the GitHub repo under `artdecoris-labs`.
Write `contracts/staging.schema.json` **first** — it is the Python↔Node contract.

Then the Python XML-RPC extractor (`uv`-managed), in order: categories → product
templates → variants → media → customers → orders — **each one looped over three
languages** (see below). Page everything; Odoo.sh enforces
per-worker timeouts, so batch 500–1000 and expect to resume.

**Reconnaissance run first**, read-only: record counts per model, attribute/variant
cardinality, image counts, currency and tax configuration.

> **Correction already made to `docs/migration-mapping.md`:** collections come from
> **`product.public.category`**, not `product.category`. Those are different models —
> `product.category` is the internal accounting/inventory category, while
> `product.public.category` is what shoppers browse. Products link via
> `public_categ_ids`, not `categ_id`. Mapping the wrong one yields a collection tree
> shaped like the accounting chart instead of the storefront.

Field names in the mapping doc remain **unverified** until this run.

> **The storefront is trilingual (nl / en / fr) and this was not in the original scope.**
> Every translatable field arrives three times. Dutch is Shopify’s primary locale while
> Odoo serves English by default, so extracting without specifying a language yields
> English and puts it in the Dutch slot — which already happened once with the artist
> entries. The staging schema needs a per-locale shape decided **before** the extractor is
> written; retrofitting means rewriting both halves. See
> `migration-mapping.md` → Languages.

### Phase C — Evaluate

Build `evaluate/`; run against the full extract; review the HTML report together; iterate
on `transform/*.yaml` until the verdict passes.

Checks: completeness, integrity (duplicate SKUs, orphan variants, broken media),
**Shopify limits** (**3 options** per product — the variant cap rose to 2048 for all
merchants in Oct 2025, so options bind, not variants; every Art Decoris product already
uses exactly three: Size + Designer + a category option), mapping coverage, and
HTML-description normalization preview.

### Phase D — Shopify load

Node loader against Admin GraphQL, pinned API version, schema-validated via Dev MCP
during authoring. Order: collections → products+variants → media → redirects → customers
→ orders.

Every record carries an `odoo.id` metafield (namespace `odoo`, key `id`,
`single_line_text_field`). Re-runs update, never duplicate. Without this a partial
failure is unrecoverable.

Plan around: customer **passwords cannot migrate** — customers must reset, which needs a
comms plan and has GDPR implications; historical orders import with limited editability;
redirects via `urlRedirectCreate` from `transform/redirects.yaml`.

**Prefer Admin-API image originals over the `/web/image/` derivatives** already pulled
into the design system — those are resized and several are below spec.

### Phase E — Cutover

Write `docs/cutover-runbook.md`: final delta extract → evaluate → load, redirect
verification, DNS, Odoo shop read-only/decommission.

---

## Open items

| Item | Owner | Blocks |
| --- | --- | --- |
| **Odoo user + API key** — Settings → Users → *user* → Account Security → New API Key. Read-only account with Sales/Inventory/Contacts/Website access is sufficient. | You | Phase B onward |
| **`stage` → `main` PR** for the theme work | You | Nothing; both branch themes are unpublished |
| **Publish the `main` theme at launch** — the live storefront still runs the unconnected *Horizon* theme #203032887644 and will keep doing so until this is done | You | Go-live |
| **`uv` not installed** — `winget install astral-sh.uv` (no system Python needed) | Either | Phase B |
| **4 images below spec** — `artist-juan` 221×228 is unusable at card size; `hero-interior` 1024×671 vs 1600×900; category tiles and collection banner are square sources going into portrait/wide slots and will crop hard | You | Design polish, not blocking |

---

## Verification

- **Phase A:** `shopify theme check --fail-level error` passes; `shopify theme dev -e stage`
  preview matches the canvas side by side at desktop and mobile widths, in both colour
  schemes; `git diff main stage` on `config/settings_data.json` shows only intended
  changes.
- **Phase B:** `uv run extract products` produces `staging/products.jsonl` validating
  clean against `staging.schema.json`; `manifest.json` counts match Odoo admin counts
  exactly.
- **Phase C:** every check class reports, and a deliberately corrupted fixture is caught
  (proves the gate is not vacuous); `load` refuses to run on a failing verdict.
- **Phase D:** dry-run diff reviewed before every apply; after the first real batch,
  re-run the same batch and confirm **zero duplicates** (proves the `odoo.id` ledger
  works); spot-check 10 products via `shopify store execute` for variants, price, images
  and description fidelity; crawl `redirects.yaml` sources and confirm 301s.
- **Phase E:** post-cutover crawl of old URLs, order/checkout smoke test, search-console
  submission.

---

## Immediate next actions

1. Save this plan to `darkfactory/docs/migration-plan.md`, link it from `README.md` and
   `CLAUDE.md`, and commit.
2. Extract and archive the design handoff into `darkfactory/design/handoff/2026-08-26/`.
3. Begin the token → `settings_data.json` translation on `stage`.
