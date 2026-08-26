# Odoo → Shopify field mapping

The contract between the two halves of the ETL. Written **before** the extractor so the
staging schema has something to encode.

> **Status: partly verified.** The instance was probed on 2026-08-26; the environment
> facts below are confirmed. Individual **field names are still unverified** — confirm
> each against the live database during the Phase 2 reconnaissance run.

## The source instance

| | |
| --- | --- |
| Storefront | <https://www.artdecoris.com> |
| Odoo version | **18.0+e — Enterprise** (confirmed via `/web/webclient/version_info`) |
| Hosting | **Odoo.sh** (confirmed via `Server:` response header) |
| Database name | in `secrets/odoo.local.env` — not committed |
| XML-RPC | `/xmlrpc/2/common` and `/xmlrpc/2/object` both confirmed reachable |

## Access

XML-RPC. `ODOO_URL`, `ODOO_DB`, `ODOO_USER`, `ODOO_API_KEY` from
`secrets/odoo.local.env` (gitignored).

```
/xmlrpc/2/common  → authenticate
/xmlrpc/2/object  → execute_kw(db, uid, key, model, 'search_read', [domain], {fields, offset, limit})
```

**Authentication is by API key, not password.** Odoo 14+ requires a key when two-factor
auth is on, and Odoo.sh instances normally have it enabled. Generate one at
**Settings → Users → *your user* → Account Security → New API Key**. The key is shown
once. It carries that user's full permissions, so use an account with read access to
Sales, Inventory, Contacts and Website — read-only is sufficient for extraction.

Always page. Never `search_read` an entire model in one call. Odoo.sh enforces per-worker
request timeouts, so keep batches small (500–1000 records) and expect to resume.

## Catalog

### `product.public.category` → Shopify custom collection

> **Use `product.public.category`, not `product.category`.** These are different models
> and mixing them up is the classic Odoo→Shopify mistake. `product.category` is the
> *internal* accounting/inventory category. `product.public.category` is the **eCommerce
> category** — what shoppers actually browse on the website, and what should become
> Shopify collections. Extract both; map the public one.

| Odoo | Shopify | Notes |
| --- | --- | --- |
| `id` | metafield `odoo.id` | Idempotency key |
| `name` | `title` | |
| `parent_id` | — | **Shopify collections are flat.** Nesting must become tags, filters, or a menu structure. Decide in `transform/category-to-collection.yaml`. |
| `sequence` | — | Preserves the merchandising order Odoo shows |
| `website_meta_title` / `website_meta_description` | `seo` | |

Products link to these via `product.template.public_categ_ids` (many2many), **not**
`categ_id`.

### `product.template` → Shopify product

| Odoo | Shopify | Notes |
| --- | --- | --- |
| `id` | metafield `odoo.id` | Idempotency key |
| `name` | `title` | |
| `description_sale` / `website_description` | `descriptionHtml` | Sanitize. Odoo website descriptions carry theme-specific markup that will not survive. |
| `default_code` | variant `sku` | On single-variant products |
| `list_price` | variant `price` | Confirm tax-inclusive vs exclusive |
| `standard_price` | `inventoryItem.cost` | |
| `weight` | variant `weight` | Odoo is kg by default — confirm |
| `barcode` | variant `barcode` | |
| `public_categ_ids` | collection membership | eCommerce categories (many2many). `categ_id` is the internal accounting category — keep it as a metafield at most. |
| `active` | `status` | `false` → `ARCHIVED` |
| `is_published` | `status` | `false` → `DRAFT` |
| `attribute_line_ids` | `productOptions` | See variant limits below |

### `product.product` → Shopify variant

| Odoo | Shopify |
| --- | --- |
| `id` | metafield `odoo.id` |
| `default_code` | `sku` |
| `product_template_attribute_value_ids` | `optionValues` |
| `lst_price` | `price` |
| `qty_available` | inventory quantity |

### Images

`ir.attachment` (`res_model = 'product.template'` / `'product.product'`), plus the
base64 `image_1920` field. Download to `staging/media/`, content-hash the filenames,
then `stagedUploadsCreate` → `fileCreate` → attach.

### ⚠ Variant ceiling

Shopify allows **100 variants and 3 options** per product. Odoo attribute matrices
routinely exceed both. This is the single most common reason a catalog migration stalls
halfway. The evaluation stage flags every offender; each one needs an explicit decision:
split into several products, drop an option, or model it with a metafield.

## Customers

`res.partner` where `customer_rank > 0` → Shopify customer.

| Odoo | Shopify |
| --- | --- |
| `id` | metafield `odoo.id` |
| `email` | `email` (required, must be unique) |
| `name` | split into `firstName` / `lastName` |
| `phone` / `mobile` | `phone` (E.164) |
| address fields | `addresses[]` |

**Passwords cannot migrate.** Customers must reset. This needs a comms plan before
cutover and has GDPR implications — do not silently skip it. Suppress Shopify's account
invite emails during the load unless the comms plan says otherwise.

## Orders

`sale.order` (state `sale` / `done`) + `sale.order.line`.

Historical orders import with limited editability and cannot be re-processed for
payment. They are for customer-account continuity and reporting, not operations. Map
`odoo.id`, order number, dates, line items, totals, and the customer link.

## Redirects and SEO

Every old Odoo URL needs a 301. Generated into `transform/redirects.yaml`, loaded with
`urlRedirectCreate`.

| Odoo pattern | Shopify pattern |
| --- | --- |
| `/shop/product/<slug>-<id>` | `/products/<handle>` |
| `/shop/category/<slug>-<id>` | `/collections/<handle>` |
| CMS pages (`website.page`) | `/pages/<handle>` |

Handles must be stable — generate once, record in staging, and never regenerate on a
re-run or every redirect breaks.

## Open questions

1. ~~Odoo version~~ — confirmed 18.0 Enterprise on Odoo.sh. The website/eCommerce module
   is clearly in use (the storefront is live).
2. Tax configuration — are `list_price` values tax-inclusive? Belgium/EU VAT applies.
3. Multi-currency? Multi-warehouse?
4. Approximate record counts per model (drives paging and runtime estimates).
5. Does the catalog use `product.template.attribute` matrices anywhere near Shopify's
   100-variant / 3-option ceiling?
6. Are there Odoo CMS pages (`website.page`) that need to become Shopify pages?
