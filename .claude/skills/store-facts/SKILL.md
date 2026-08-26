---
name: store-facts
description: Look up the Art Decoris Shopify store handle, theme IDs, and branch-to-theme mapping. Use whenever a command needs --store or a theme ID, or when you are about to hardcode a store identifier anywhere.
---

# Store facts

**These values are never committed.** Both repositories are public. This skill tells you
where to read them from locally.

## Where the values live

| Fact | Source of truth | Local cache |
| --- | --- | --- |
| Store handle | Shopify admin | `C:\DevOps\artdecoris-shop-theme-00\shopify.theme.toml` (gitignored) |
| Stage / production theme IDs | `shopify theme list` | same file |
| Admin API token | Shopify admin → Apps | `secrets/*.local.env` (gitignored) |
| Dev theme ID | Shopify CLI cache | `%APPDATA%\shopify-cli-development-theme-config-nodejs\Config\config.json` |

## Reading them

```powershell
Get-Content C:\DevOps\artdecoris-shop-theme-00\shopify.theme.toml
shopify theme list            # from the theme directory, resolves the store from the toml
```

If `shopify.theme.toml` is missing, copy `shopify.theme.toml.example` next to it and fill
it in. Theme IDs come from `shopify theme list`.

## Rules

- Prefer `shopify theme <cmd> -e stage` / `-e production` over passing `--store` and
  `--theme` by hand. The environment names come from the toml.
- **Never** write a store handle, theme ID, or token into a tracked file, a commit
  message, a PR description, or a code comment.
- If you catch a real identifier in a diff, stop and remove it before committing.
