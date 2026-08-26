# secrets/

Local-only values. **Everything in this directory except this file and `*.example`
files is gitignored, and must stay that way — this repository is public.**

Expected contents (create locally, never commit):

| File | Holds |
| --- | --- |
| `shopify.local.env` | `SHOPIFY_STORE`, `SHOPIFY_ADMIN_TOKEN` |
| `odoo.local.env` | `ODOO_URL`, `ODOO_DB`, `ODOO_USER`, `ODOO_API_KEY` |

The store handle and theme IDs also live in the theme repo's gitignored
`shopify.theme.toml`. See the `store-facts` skill.

If you ever find a real credential or store identifier in a tracked file, treat it as
leaked: rotate it in Shopify/Odoo admin, then remove it from the file. Rewriting git
history does not un-publish something that was pushed to a public repo.
