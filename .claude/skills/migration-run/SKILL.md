---
name: migration-run
description: Run the Odoo to Shopify migration safely - extract, evaluate, load. Use when asked to migrate, extract, or import products, customers, orders, or redirects.
---

# Migration run

Pipeline: **extract → stage → evaluate (gate) → load**. Repo:
`C:\DevOps\artdecoris-odoo-migration`.

## Order of operations

```powershell
uv run extract categories products media customers orders   # Odoo -> staging/
uv run evaluate                                             # -> reports/evaluation/<run>/
# review the HTML report with the user, fix transform/*.yaml, re-evaluate
npm --prefix load run load -- --dry-run
npm --prefix load run load -- --apply
```

## Non-negotiable rules

1. **The evaluation gate is real.** `load` refuses to run unless `manifest.json`
   references a passing evaluation verdict. `--force` exists; do not reach for it
   without the user explicitly asking.
2. **Dry run first, every time.** `--apply` is never the first invocation.
3. **Idempotency.** Every Shopify record carries an `odoo.id` metafield holding its
   source ID. Loads look it up and update rather than create. If you are writing load
   code that does not do this, stop.
4. **Development store first.** Rehearse the full load, reconcile, then run against the
   real store.
5. **Never put bulk records through MCP or a chat tool.** The loader talks to the Admin
   GraphQL API directly. MCP is for authoring queries and spot-checking results.

## Things that bite

- **Variant ceilings.** Shopify allows 100 variants and 3 options per product. Odoo
  attribute matrices routinely exceed both. The evaluation report flags this; it is the
  single most common reason a catalog migration stalls halfway.
- **Customer passwords cannot migrate.** Customers must reset. This needs a comms plan
  and has GDPR implications — raise it, do not silently skip it.
- **Redirects are not optional.** Every old Odoo product and category URL needs a 301 to
  its Shopify equivalent, generated from `transform/redirects.yaml`.
- **Partial failures.** Loads must be resumable. Check the ledger before assuming a
  re-run is safe.
