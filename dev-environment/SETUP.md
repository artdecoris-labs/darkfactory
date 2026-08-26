# Artdecoris Development Environment

Complete setup guide for developing Shopify themes and extensions using the Artdecoris workflow.

## Overview

This development environment integrates five core components:

1. **VS Code**: Editor and chat interface
2. **Shopify CLI**: Theme deployment, authentication, and local preview
3. **Shopify AI Toolkit**: Shopify documentation, API schema search, validation, and store management
4. **GitHub**: Version control and branch workflow
5. **Git**: Local repository management

## Prerequisites

- Windows 10 or later (or macOS/Linux equivalent)
- Administrator access for installing tools
- GitHub account and personal access token (for Git authentication)
- Shopify store account (e.g., `yourstore.myshopify.com`)

## 1. Install VS Code

Download and install from [code.visualstudio.com](https://code.visualstudio.com).

**Required extensions:**
- GitHub Copilot (by Microsoft)
- GitHub Copilot Chat (by Microsoft)

**Recommended extensions:**
- Liquid (shopify/theme-liquid-vscode)
- GraphQL (GraphQL Foundation)
- Thunder Client (REST API testing)

### Enable Agent Plugins Preview

1. Open Settings (`Ctrl+,`).
2. Search for `"Agent plugins"` or `"@exp"`.
3. Enable the **Agent plugins** preview flag.
4. Reload VS Code.

## 2. Install Git

Download and install from [git-scm.com](https://git-scm.com).

**Configure identity** (local or global):

```powershell
git config --local user.name "Your Name"
git config --local user.email "your-email@example.com"
```

**Windows default line endings:**

```powershell
git config --global core.autocrlf true
```

## 3. Install Node.js

Download and install from [nodejs.org](https://nodejs.org) (LTS version).

Verify installation:

```powershell
node --version
npm --version
```

## 4. Install Shopify CLI

Install globally:

```powershell
npm install -g @shopify/cli@latest
```

**Authenticate with your store:**

```powershell
shopify auth login
```

When prompted, enter your store URL (e.g., `yourstore.myshopify.com`).

**Verify installation:**

```powershell
shopify theme list
shopify theme dev
```

## 5. Install Shopify AI Toolkit

The Shopify AI Toolkit is a VS Code plugin that provides AI-assisted Shopify development.

### Installation Steps

1. Open VS Code.
2. Open the Command Palette (`Ctrl+Shift+P` on Windows/Linux, `Cmd+Shift+P` on macOS).
3. Run the command:

```text
Chat: Install Plugin From Source
```

4. When prompted, enter the repository URL:

```text
https://github.com/Shopify/shopify-ai-toolkit
```

5. Follow the on-screen prompts to complete installation.

### What You Get

- **Shopify Documentation Search**: Find docs without leaving the editor.
- **API Schema Validation**: Validate GraphQL queries and Liquid templates.
- **Store Management**: Execute CLI commands for store operations.
- **Auto-Updates**: The plugin updates automatically.

### Configuration

**Opt out of telemetry** (optional):

```powershell
$env:OPT_OUT_INSTRUMENTATION = "true"
```

Add to your shell profile to persist across sessions.

## 6. Clone or Create a Theme Repository

The theme repository lives separately from this dev-environment folder.

**Example structure:**

```text
C:\DevOps\
├── darkfactory/              # Team/org repo (this folder)
│   └── dev-environment/      # Setup documentation
└── artdecoris-shop-theme-00/ # Theme repository
    ├── main                  # Production branch
    ├── stage                 # Staging/testing branch
    ├── assets/
    ├── sections/
    ├── templates/
    └── README.md
```

**Clone an existing theme:**

```powershell
git clone https://github.com/your-org/your-theme.git
cd your-theme
shopify theme list
```

## 7. Workflow: Local Development

### Start Local Theme Preview

```powershell
cd <theme-directory>
shopify theme dev --store yourstore.myshopify.com
```

This opens a local preview URL (typically `http://localhost:9292`).

### Commit Changes

```powershell
git switch stage
git add .
git commit -m "Your change description"
git push origin stage
```

### Preview on Shopify (Stage Theme)

1. In your Shopify admin, go to **Online Store > Themes**.
2. Find the theme connected to the `stage` branch.
3. Click **Preview** to see the unpublished theme.

### Release to Production

After staging is approved:

```powershell
git switch main
git pull
git merge stage
git push origin main
```

Shopify CLI automatically syncs the `main` branch to your published theme.

## 8. Using the Shopify AI Toolkit

### In VS Code Chat

Ask natural language questions:

```text
"How do I add a custom section to this theme?"
"Validate this GraphQL query"
"Search for Shopify Liquid filters"
"Show me how to update product settings via CLI"
```

The toolkit provides real-time documentation, schema validation, and executable commands.

### Store Management

Access store commands through the toolkit:

```text
"List all products in my store"
"Update the product price for SKU 12345"
```

The toolkit uses Shopify CLI's store execute capability.

## 9. Recommended VS Code Settings

Create `.vscode/settings.json` in your theme repository:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[liquid]": {
    "editor.defaultFormatter": "Shopify.theme-liquid-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/.DS_Store": true
  }
}
```

## 10. Authentication and Secrets

**Never commit credentials or tokens to Git.**

### GitHub Personal Access Token

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens).
2. Create a token with `repo` scope.
3. Store it in your Git credential manager (Windows Credential Manager).

### Shopify API Credentials

1. Shopify CLI stores credentials locally in `~/.shopify-cli`.
2. Never commit this directory.
3. Ensure `.gitignore` includes:

```text
.env
.env.local
node_modules/
.shopify-cli/
```

## 11. Troubleshooting

### Shopify CLI Not Found

Ensure Node.js and npm are installed, then reinstall:

```powershell
npm install -g @shopify/cli@latest
```

### Theme Check Fails

Run validation directly:

```powershell
shopify theme check
```

Fix reported issues or consult [Shopify Theme Check docs](https://shopify.dev/docs/themes/tools/theme-check).

### Plugin Installation Issues

1. Confirm **Agent plugins** preview is enabled in VS Code settings.
2. Reload VS Code (`Ctrl+Shift+P` → **Developer: Reload Window**).
3. Retry **Chat: Install Plugin From Source**.

## 12. Additional Resources

- [Shopify Theme Development](https://shopify.dev/docs/themes)
- [Shopify CLI Documentation](https://shopify.dev/docs/themes/tools/cli)
- [Shopify AI Toolkit Docs](https://shopify.dev/docs/apps/build/ai-toolkit)
- [Liquid Template Language](https://shopify.dev/docs/api/liquid)
- [GitHub Copilot Documentation](https://github.com/features/copilot)

## Quick Start Checklist

- [ ] VS Code installed and updated
- [ ] Agent plugins preview enabled
- [ ] Git installed and configured
- [ ] Node.js and npm installed
- [ ] Shopify CLI installed and authenticated
- [ ] Shopify AI Toolkit installed in VS Code
- [ ] Theme repository cloned locally
- [ ] `.vscode/settings.json` configured
- [ ] Shopify theme preview running locally (`shopify theme dev`)
- [ ] First commit and push to `stage` branch complete

## Support

For issues with specific tools, refer to their official documentation. For workflow questions, see your organization's team guide or the main theme repository's README.

---

**Last updated:** 2026-08-26
