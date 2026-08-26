# ADR 0004: Migration pipeline shape

**Status:** Accepted · **Date:** 2026-08-26

## Context

The Odoo shop must move to Shopify: products with variants, images and categories, plus
customers, historical orders, and URL redirects for SEO continuity. Odoo exposes an
XML-RPC / JSON-RPC API. Odoo's client ecosystem is strongest in Python; Shopify's Admin
API client and CLI are first-class in Node.

## Decision

**Pipeline:** extract → stage → **evaluate (human gate)** → load.

**Languages:** Python for extract (idiomatic Odoo access), Node/TypeScript for load
(first-class Shopify Admin API). The seam between them is a neutral staging format.

**Four load-bearing rules:**

1. **`contracts/staging.schema.json` is the contract.** Python writes it, Node reads it,
   both validate against it. This is what makes a two-language split safe rather than
   fragile — nothing crosses the boundary unvalidated.
2. **Evaluation is a blocking gate.** `load` refuses to run unless `manifest.json`
   references a passing evaluation verdict. `--force` exists but must be typed
   deliberately.
3. **Idempotency via metafield.** Every Shopify record carries `odoo.id` (namespace
   `odoo`, key `id`, `single_line_text_field`) holding its source Odoo ID. Loads look it
   up and update rather than create.
4. **Dry-run is the default.** `--apply` must be passed explicitly.

## Rationale

The evaluation gate is the part worth defending. A catalog load that fails halfway is
far more expensive to undo than to prevent, and the failure modes are knowable in
advance — Shopify's 100-variant / 3-option ceiling against Odoo attribute matrices,
duplicate SKUs, missing images, unmapped categories. Discovering those from a report is
cheap; discovering them from a half-populated production store is not.

Rule 3 is what makes a failed run recoverable at all. Without a stable source-ID link,
the only way to recover from a partial load is to delete everything and start over.

## Alternatives considered

- **Single language for both halves.** Rejected: Python's Shopify tooling and Node's
  Odoo tooling are both distinctly worse than the first-party option on each side. The
  schema contract makes the split cheap.
- **CSV import via Shopify admin.** Rejected: no idempotency, no variant-limit
  handling, no redirects, and it does not survive a second run.
- **Agent-driven import over MCP.** Rejected — see [ADR 0003](0003-mcp-scope.md).

## Consequences

- Two toolchains to install (`uv` for Python, npm for Node).
- The schema is extra up-front work, and it is the thing that makes re-runs safe.
- The evaluation report is a real deliverable the user reviews, not a log file.
