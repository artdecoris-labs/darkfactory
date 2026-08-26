# Shopify AI Toolkit - Team Shared Configuration

This folder contains **shared team customizations and templates** for the Shopify AI Toolkit. The plugin itself is installed locally on each developer's machine via VS Code.

## Folder Structure

```text
shopify-ai-toolkit/
├── README.md                    (this file)
├── .env.example                 (environment variables template)
├── config.json                  (team configuration template)
├── custom-skills/               (team custom skills and validation scripts)
│   ├── validate-theme.mjs       (theme validation hook)
│   ├── search-docs-custom.mjs   (custom documentation search)
│   └── README.md                (custom skills documentation)
└── ARCHITECTURE.md              (architecture and integration decisions)
```

## Installation

### 1. Install Plugin Locally (Each Developer)

The Shopify AI Toolkit plugin is installed in each developer's VS Code:

```powershell
# In VS Code:
Ctrl+Shift+P → Chat: Install Plugin From Source
# Enter: https://github.com/Shopify/shopify-ai-toolkit
```

This places the plugin in `~/.vscode/extensions/` (local machine only).

### 2. Link Team Configuration (Each Developer)

Clone `darkfactory` and set the toolkit's environment:

```powershell
cd C:\DevOps\darkfactory
git pull

# Set environment variable (Windows):
$env:SHOPIFY_AI_TOOLKIT_CONFIG = "C:\DevOps\darkfactory\dev-environment\shopify-ai-toolkit"

# Or add to PowerShell profile for persistence:
Add-Content $PROFILE "`n`$env:SHOPIFY_AI_TOOLKIT_CONFIG = 'C:\DevOps\darkfactory\dev-environment\shopify-ai-toolkit'"
```

### 3. Configure Custom Skills

Copy `.env.example` to `.env` and update with your store details:

```powershell
cd C:\DevOps\darkfactory\dev-environment\shopify-ai-toolkit
Copy-Item .env.example .env
# Edit .env with your store credentials (never commit .env)
```

## Environment Variables

See [.env.example](.env.example) for all available options.

**Key variables:**

- `SHOPIFY_STORE_URL`: Your Shopify store URL (e.g., `yourstore.myshopify.com`)
- `SHOPIFY_API_TOKEN`: API access token (keep secret, use `.env` only)
- `THEME_PATH`: Path to your local theme repository
- `OPT_OUT_INSTRUMENTATION`: Set to `true` to disable telemetry

## Custom Skills

The `custom-skills/` folder contains team-approved validation and search scripts.

### Validate Theme

Run theme validation tailored to Artdecoris standards:

```powershell
node custom-skills/validate-theme.mjs --theme-path C:\DevOps\artdecoris-shop-theme-00
```

### Search Shopify Docs

Custom search behavior optimized for team needs:

```powershell
node custom-skills/search-docs-custom.mjs "Liquid filters"
```

See [custom-skills/README.md](custom-skills/README.md) for full documentation.

## Configuration

Edit `config.json` to customize team-wide behavior:

- Validation rules
- Default search scopes
- Store execution policies
- Logging and debugging options

**Never commit sensitive data** to this file (store credentials, API tokens, etc.).

## Integration with Theme Development

When working on the theme repository:

```powershell
cd C:\DevOps\artdecoris-shop-theme-00
shopify theme dev

# In VS Code Chat, ask questions using the toolkit:
# "Validate this Liquid template"
# "Search for product filtering examples"
# "List products in my store"
```

The toolkit uses your configured store URL and credentials to provide store-aware assistance.

## Telemetry & Privacy

Shopify AI Toolkit sends usage data to Shopify by default. 

**Opt out** by setting in `.env`:

```text
OPT_OUT_INSTRUMENTATION=true
```

See the main SETUP.md for full telemetry details.

## Troubleshooting

### Plugin Not Found

1. Confirm plugin is installed in VS Code:
   - Go to **Extensions** (`Ctrl+Shift+X`).
   - Search for "Shopify AI Toolkit".
   - Should show as "Installed".

2. Reload VS Code:
   - `Ctrl+Shift+P` → **Developer: Reload Window**.

### Environment Variables Not Loading

1. Confirm `.env` exists and is readable.
2. Restart VS Code after setting `SHOPIFY_AI_TOOLKIT_CONFIG`.
3. Verify the path has no spaces or special characters.

### Custom Skills Not Running

1. Ensure Node.js is installed: `node --version`.
2. Check script permissions: `ls -la custom-skills/`.
3. Run script directly to see errors: `node custom-skills/validate-theme.mjs`.

## Team Guidelines

1. **Commit templates and docs**: Always commit updates to `.env.example`, `config.json` templates, and custom skills.
2. **Never commit secrets**: `.env` and credentials must be `.gitignore`d.
3. **Review custom skills**: Team lead reviews all custom validation scripts before merging.
4. **Test locally first**: Validate changes on your local machine before pushing to `darkfactory`.

## Related Documentation

- [Development Environment Setup](../SETUP.md)
- [Architecture Record](ARCHITECTURE.md)
- [Shopify AI Toolkit Official Docs](https://shopify.dev/docs/apps/build/ai-toolkit)
- [Custom Skills Guide](custom-skills/README.md)

---

**Last updated:** 2026-08-26
