# Odoo → Shopify field mapping

The contract between the two halves of the ETL. Written **before** the extractor so the
staging schema has something to encode.

> **Status: draft — unverified against the live Odoo instance.** Field names below are
> standard Odoo 16/17. Confirm every one against the real database during the Phase 2
> reconnaissance run, and record the Odoo version here when known.
>
> **Odoo version:** _to be confirmed_

## Access

XML-RPC. `ODOO_URL`, `ODOO_DB`, `ODOO_USER`, `ODOO_API_KEY` from
`secrets/odoo.local.env` (gitignored).

```
/xmlrpc/2/common  → authenticate
/xmlrpc/2/object  → execute_kw(db, uid, key, model, 'search_read', [domain], {fields, offset, limit})
```

Always page. Never `search_read` an entire model in one call.

## Catalog

### `product.category` → Shopify custom collection

| Odoo | Shopify | Notes |
| --- | --- | --- |
| `id` | metafield `odoo.id` | Idempotency key |
| `name` | `title` | |
| `complete_name` | — | Use to rebuild hierarchy |
| `parent_id` | — | **Shopify collections are flat.** Nesting must become tags, filters, or a menu structure. Decide in `transform/category-to-collection.yaml`. |

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
| `categ_id` | collection membership | |
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

1. Odoo version and whether the website module is in use.
2. Tax configuration — are `list_price` values tax-inclusive?
3. Multi-currency? Multi-warehouse?
4. Approximate record counts per model (drives paging and runtime estimates).
