# ADR 0003: MCP is for authoring, not for moving data

**Status:** Accepted · **Date:** 2026-08-26

## Context

"Shopify MCP" refers to three different things, and conflating them leads to bad
architecture:

| | What it provides | Credentials |
| --- | --- | --- |
| **Shopify Dev MCP** (`@shopify/dev-mcp`) | Docs search, live Admin/Storefront GraphQL schema introspection | none, read-only |
| **Store access via Shopify CLI** (`shopify store execute`) | Real Admin GraphQL execution | store auth |
| **Storefront MCP** (`https://<store>/api/mcp`) | Customer-facing catalog and cart | storefront |

The migration must move thousands of products, customers and orders.

## Decision

Add **Shopify Dev MCP** to `.mcp.json`. Use the already-installed
`shopify-use-shopify-cli` skill for store reads. Storefront MCP is not relevant here.

**No MCP server sits in the bulk data path.** The loader talks to the Admin GraphQL API
directly from ordinary code.

MCP and skills are used for:

- **authoring** — schema-validating `productSet`, `stagedUploadsCreate`,
  `customerCreate`, `orderCreate`, `urlRedirectCreate` against the pinned API version;
- **reconnaissance** — probing a development store for real field shapes;
- **spot-checks** — verifying sampled records after a load;
- **ops** — theme and store management during cutover.

## Rationale

Routing bulk records through MCP means every row round-trips through model context:
slow, expensive, and non-deterministic. An ETL needs reproducibility, a resumable
idempotency ledger, explicit rate-limit and partial-failure handling, and bulk
operations. That is code, not tool calls.

Schema introspection is the part that genuinely earns its place — it verifies generated
mutations against the exact API version, which prose documentation only approximates.

## Consequences

- Loads are reproducible and resumable; a re-run is safe.
- Generated GraphQL is schema-checked before it reaches the loader.
- Anyone tempted to "just have the agent import the products" has a written answer for
  why that is not the design.
