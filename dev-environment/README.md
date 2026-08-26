# Development Environment

Shared development notes for the Artdecoris Shopify theme workflow.

## Components

### VS Code

VS Code is the development editor and AI-agent host. Open the workspace folder that contains this repository and the theme repository when working across both projects.

Enable the **Agent plugins** preview if it is not already enabled:

1. Open VS Code Settings.
2. Search for `agent plugins`.
3. Enable the Agent plugins preview setting.
4. Reload VS Code if prompted.

### GitHub

GitHub stores the theme source, branch history, pull requests, and review decisions.

Theme repository:

```text
C:\DevOps\artdecoris-shop-theme-00
```

Branch mapping:

| Branch | Shopify purpose |
| --- | --- |
| `stage` | Unpublished theme for development and preview |
| `main` | Published theme for production |

Develop on `stage`, review the changes, and merge accepted work into `main`.

### Shopify CLI

Shopify CLI handles local authentication, theme previews, file transfers, and theme validation.

Install or update it:

```powershell
npm install -g @shopify/cli@latest
```

Authenticate and inspect available themes:

```powershell
shopify auth login
shopify theme list
```

Run a local preview from the theme directory:

```powershell
Set-Location "C:\DevOps\artdecoris-shop-theme-00"
shopify theme dev
```

Run theme validation:

```powershell
shopify theme check
```

### Shopify AI Toolkit

The Shopify AI Toolkit is an AI-agent plugin. It is installed in VS Code and is separate from the theme repository. It provides Shopify documentation and API schema search, Liquid and GraphQL validation, and Shopify CLI store-management capabilities.

Install it in VS Code:

1. Open the Command Palette with `Ctrl+Shift+P`.
2. Run **Chat: Install Plugin From Source**.
3. Enter:

```text
https://github.com/Shopify/shopify-ai-toolkit
```

Use the official Shopify AI Toolkit repository for updates and platform-specific installation instructions:

<https://github.com/Shopify/shopify-ai-toolkit>

The toolkit does not replace GitHub or Shopify CLI:

- Use the toolkit for Shopify-aware assistance, documentation, schemas, and validation.
- Use Shopify CLI for local preview, authentication, theme transfers, and checks.
- Use GitHub for source control, review, and releases.
- Keep theme source changes in the theme repository.

### Shopify MCP / AI connection

Connect an AI tool through Shopify's supported AI app or CLI connector. Before authorizing access, review the requested scopes and whether write access is included. The effective access is limited by both the approved app permissions and the Shopify user's permissions.

Review every proposed store change before confirming it. Do not commit credentials, access tokens, or MCP configuration containing secrets.

Official guidance:

<https://help.shopify.com/en/manual/ai-powered-tools/connecting-ai-tools>

## Normal workflow

```text
You define the change
        |
        v
Shopify AI Toolkit provides Shopify-aware help and validation
        |
        v
Shopify CLI previews and validates the local theme
        |
        v
GitHub stage branch stores and reviews the change
        |
        v
GitHub main branch receives approved changes
        |
        v
Shopify main theme remains the live version
```

1. Start from the latest `stage` branch.
2. Make theme changes in `C:\DevOps\artdecoris-shop-theme-00`.
3. Use Shopify CLI to preview and validate the theme.
4. Commit and push the work to `stage`.
5. Preview the unpublished Shopify theme and review the result.
6. Merge approved work into `main`.
7. Update or publish the production Shopify theme only as an explicit release action.

Example Git commands:

```powershell
Set-Location "C:\DevOps\artdecoris-shop-theme-00"
git switch stage
git pull

# After development and review
git add -A
git commit -m "Describe the theme change"
git push origin stage
```

## Security and privacy

- Never place Shopify credentials, tokens, or private connector settings in GitHub.
- Review the permissions requested by every AI connector.
- Treat AI-generated output as unverified until reviewed.
- Monitor the Shopify admin after any tool with write access is used.
- Revoke an AI connection from Shopify admin if it is no longer needed.
