# Architecture Record: Shopify AI Toolkit Integration

**Status:** Accepted  
**Date:** 2026-08-26  
**Author:** Artdecoris Development Team  
**Reviewers:** TBD

## Problem Statement

The Shopify AI Toolkit is a VS Code plugin that provides documentation search, validation, and store management capabilities. The team needs a clear separation between:

1. **Per-developer installation** (VS Code plugin, local to each machine)
2. **Team-shared configuration** (custom scripts, templates, environment setup)

Without this clarity, there's risk of:
- Duplicate setup work across developers
- Inconsistent validation rules or configurations
- Difficulty onboarding new team members
- Loss of team-specific customizations if not tracked in Git

## Decision

**Separate the toolkit into two layers:**

### Layer 1: Local Plugin Installation (Each Developer)

- **Location:** `~/.vscode/extensions/` (machine-local, not in Git)
- **Installation:** `Ctrl+Shift+P` → `Chat: Install Plugin From Source`
- **Repository:** `https://github.com/Shopify/shopify-ai-toolkit`
- **Owned by:** Shopify, auto-updated
- **Team responsibility:** None (each developer installs)

### Layer 2: Team Shared Configuration (In `darkfactory`)

- **Location:** `C:\DevOps\darkfactory\dev-environment\shopify-ai-toolkit\`
- **Contents:** 
  - `.env.example` — Environment variable templates (store URL, API tokens, paths)
  - `config.json` — Team-wide configuration (validation rules, search scopes, logging)
  - `custom-skills/` — Team-approved Node.js validation and search scripts
  - `README.md` — Setup and integration guide
  - `ARCHITECTURE.md` — This document
- **Owned by:** Development team lead
- **Version controlled:** Yes (Git in `darkfactory`)
- **Shared:** All developers clone `darkfactory` and reference this folder

## Architecture

```text
Developer Machine                           GitHub
===================                         ======

~/.vscode/
  └── extensions/
      └── shopify-ai-toolkit/     ◄─────── https://github.com/Shopify/shopify-ai-toolkit
          (auto-updates)

C:\DevOps\
├── darkfactory/                 ◄─────── https://github.com/artdecoris-labs/darkfactory
│   ├── dev-environment/
│   │   ├── SETUP.md
│   │   └── shopify-ai-toolkit/
│   │       ├── .env             (local, not committed)
│   │       ├── .env.example     ◄─────── Committed to Git
│   │       ├── config.json      ◄─────── Committed to Git
│   │       ├── custom-skills/   ◄─────── Committed to Git
│   │       │   ├── validate-theme.mjs
│   │       │   └── search-docs-custom.mjs
│   │       └── README.md        ◄─────── Committed to Git
│   └── ...
│
└── artdecoris-shop-theme-00/    ◄─────── https://github.com/artdecoris-labs/artdecoris-shop-theme-00
    ├── main                     (production)
    ├── stage                    (testing)
    └── ...
```

## Data Flow

```
Developer                  VS Code Chat                Shopify AI Toolkit          Shopify Store
============               ============                ==================          ==============
1. Ask question ──────────→ (e.g., "validate theme")
                                                      │
2.                                                    ├─→ Load config.json
                                                    │    Load .env
                                                    │    Run custom-skills/validate-theme.mjs
                                                    │
3.                          ←──────────────────────┤─→ Call Shopify API
                                                    │    (if store interaction)
                                                    │
4. Review result ◄─────────────────────────────────┤
   (approve action)
                                                    └─→ Execute (if approved)
```

## Benefits

| Aspect | Benefit |
|--------|---------|
| **Separation of concerns** | Plugin updates don't affect team configuration. Team config changes don't require reinstalling plugin. |
| **Onboarding** | New devs clone `darkfactory`, set environment variables, and use the same toolkit behavior as the team. |
| **Version control** | Team customizations (custom skills, validation rules) are tracked in Git and can be reviewed. |
| **Scalability** | Multiple teams can fork `darkfactory` and adapt the toolkit configuration for their needs. |
| **Security** | `.env` is gitignored; credentials are never committed. `config.json` stores only non-secret policies. |
| **Consistency** | All developers validate code the same way, use the same search preferences, respect the same store operation policies. |

## Implementation Details

### Environment Variables

The toolkit respects environment variables that override `config.json`:

```powershell
$env:SHOPIFY_STORE_URL = "mystore.myshopify.com"
$env:SHOPIFY_AI_TOOLKIT_CONFIG = "C:\DevOps\darkfactory\dev-environment\shopify-ai-toolkit"
$env:OPT_OUT_INSTRUMENTATION = "true"
```

Each developer creates a local `.env` file from `.env.example` with their own store credentials (never committed).

### Custom Skills

Team developers can add Node.js scripts to `custom-skills/`:

- Run as: `node custom-skills/script-name.mjs [options]`
- Automatically discovered by toolkit
- Committed to `darkfactory` for team reuse
- Reviewed by team lead before merge

### Configuration Policies

`config.json` enforces:

- **Validation strictness**: Liquid, GraphQL, JSON validation levels
- **Store execution**: Require confirmation before updates; limit operations to read/update (no delete without review)
- **Telemetry**: Team opt-out preference
- **Logging**: Audit trails for compliance

## Migration Path

**For existing projects:**

1. Create `dev-environment/shopify-ai-toolkit/` in your team's shared repository.
2. Copy `.env.example` and `config.json` templates from this record.
3. Update `SETUP.md` to reference the toolkit configuration.
4. Each developer:
   - Clones/pulls the shared repo.
   - Installs the VS Code plugin locally.
   - Creates a local `.env` from `.env.example`.
   - References the shared config in `SHOPIFY_AI_TOOLKIT_CONFIG` environment variable.

## Alternatives Considered

### Alternative 1: Entire Toolkit in Git

**Rejected** because:
- Shopify regularly updates the plugin; we'd be maintaining a fork.
- The plugin has dependencies and auto-update logic that belong in VS Code, not Git.
- Team-specific config is small; no need for the whole plugin in version control.

### Alternative 2: No Team Configuration, Each Dev Custom

**Rejected** because:
- No consistency; each dev might validate differently.
- New hires struggle with setup and standards.
- No audit trail for store operations.
- Loss of custom skills across team members.

### Alternative 3: Shopify Marketplace Plugin Only

**Rejected** because:
- Marketplace plugins don't support team customization.
- No way to add custom validation or store scripts.
- Would require centralizing all team logic in Shopify admin, not in code.

## Compliance & Security

- **Secrets management**: `.env` is gitignored; no credentials in repository.
- **Audit logging**: Store operations are logged to `logs/audit.log`.
- **Telemetry opt-out**: Configurable per-team via `OPT_OUT_INSTRUMENTATION`.
- **Access control**: Team configuration is stored in the shared `darkfactory` repository, which has its own GitHub permissions.

## Future Enhancements

1. **Automated testing**: Pre-commit hooks to validate custom skills.
2. **CI/CD integration**: Run `validate-theme.mjs` in GitHub Actions on PR to `artdecoris-shop-theme-00`.
3. **Skill marketplace**: A team-wide registry of approved custom skills with versioning.
4. **Multi-store support**: Support multiple Shopify stores with different configurations.

## Related Documents

- [SETUP.md](../SETUP.md) — Development environment setup for all tools.
- [README.md](README.md) — Shopify AI Toolkit folder overview and team guidelines.
- [custom-skills/README.md](custom-skills/README.md) — How to develop and add custom skills.
- [Shopify AI Toolkit Official Docs](https://shopify.dev/docs/apps/build/ai-toolkit)

## Review Checklist

- [ ] Architecture clear to new team members
- [ ] Security considerations addressed (no secrets in repo)
- [ ] Separation of local and shared concerns understood
- [ ] Custom skills process documented
- [ ] Configuration management explained
- [ ] Migration path provided for existing projects

---

**Version:** 1.0  
**Last updated:** 2026-08-26
