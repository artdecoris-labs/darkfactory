# Custom Skills for Shopify AI Toolkit

This folder contains team-approved custom skills and validation scripts that extend the Shopify AI Toolkit's capabilities.

## Available Skills

### 1. validate-theme.mjs

Validates the theme against Artdecoris standards.

**Usage:**

```powershell
node validate-theme.mjs --theme-path C:\DevOps\artdecoris-shop-theme-00
```

**What it checks:**

- Liquid syntax errors
- Shopify theme structure compliance
- Performance best practices
- Accessibility standards
- CSS/JavaScript linting

**Output:**

```text
Theme Validation Report
======================
File: sections/header.liquid
  ✓ Liquid syntax valid
  ✓ No unused variables
  ⚠ Warning: Consider using native Shopify icon system

File: assets/main.css
  ✓ CSS valid
  ✓ No critical performance issues
```

### 2. search-docs-custom.mjs

Custom search across Shopify documentation with team-specific filtering.

**Usage:**

```powershell
node search-docs-custom.mjs "Liquid filters"
node search-docs-custom.mjs "GraphQL admin API products" --category api
```

**Search scopes:**

- `liquid`: Liquid template language
- `api`: GraphQL Admin API
- `cli`: Shopify CLI commands
- `theme`: Theme development
- `extensions`: App extensions
- `all`: All documentation (default)

**Output:**

```text
Search Results for "Liquid filters"
===================================

1. String Filters
   https://shopify.dev/docs/api/liquid/filters/string
   Modify strings using filters like upcase, downcase, split...

2. Arithmetic Filters
   https://shopify.dev/docs/api/liquid/filters/math
   Perform calculations with plus, minus, times, divided_by...
```

## Adding Custom Skills

To add a new custom skill:

1. **Create a new `.mjs` file** in this directory:

```bash
touch custom-skills/my-skill.mjs
```

2. **Follow the structure:**

```javascript
#!/usr/bin/env node

/**
 * My Custom Skill
 * Description of what this skill does
 */

import { parseArgs } from 'util';

const options = {
  help: { type: 'boolean', short: 'h', default: false },
  output: { type: 'string', short: 'o', default: 'console' },
};

const { values, positionals } = parseArgs({ options, allowPositionals: true });

if (values.help) {
  console.log(`
Usage: node my-skill.mjs [options] <args>

Options:
  -h, --help        Show this help message
  -o, --output      Output format: console, json, markdown

Example:
  node my-skill.mjs "my query"
  node my-skill.mjs --output json "my query"
  `);
  process.exit(0);
}

async function main() {
  try {
    // Your skill logic here
    const result = await mySkillLogic(positionals);
    
    if (values.output === 'json') {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(result);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

async function mySkillLogic(args) {
  // Implement your logic
  return { success: true, data: args };
}

main();
```

3. **Make it executable** (macOS/Linux):

```bash
chmod +x custom-skills/my-skill.mjs
```

4. **Test locally:**

```powershell
node custom-skills/my-skill.mjs --help
node custom-skills/my-skill.mjs "test input"
```

5. **Document it** in this README.

6. **Commit to `darkfactory`:**

```powershell
git add custom-skills/my-skill.mjs README.md
git commit -m "Add custom skill: my-skill"
git push origin main
```

## Integrating with VS Code Chat

Once a custom skill is added to this folder, reference it in VS Code Chat:

```text
"Run the theme validator on my current theme"
"Search for Liquid filter examples"
"Validate my GraphQL query"
```

The toolkit automatically discovers and loads skills from this directory.

## Best Practices

1. **Keep skills focused**: One skill = one clear purpose.
2. **Use meaningful output**: Make results actionable and readable.
3. **Handle errors gracefully**: Provide helpful error messages.
4. **Log operations**: Use console for debugging; consider writing to a log file for production.
5. **Test thoroughly**: Run locally before pushing to `darkfactory`.
6. **Document parameters**: Include inline help with `--help` flag.
7. **Respect permissions**: Don't auto-execute store changes; always require confirmation.

## Testing Custom Skills

Run tests with:

```powershell
npm test  # (if test suite is configured)
```

Or manually:

```powershell
# Test validate-theme.mjs
node custom-skills/validate-theme.mjs --theme-path C:\DevOps\artdecoris-shop-theme-00

# Test search-docs-custom.mjs
node custom-skills/search-docs-custom.mjs "Shopify payment methods" --category api
```

## Troubleshooting

**"Cannot find module" error:**

Ensure Node.js modules are installed:

```powershell
npm install  # (from darkfactory root or custom-skills directory)
```

**"Permission denied" error (macOS/Linux):**

```bash
chmod +x custom-skills/my-skill.mjs
```

**Script runs but no output:**

Check for errors:

```powershell
node custom-skills/my-skill.mjs --help
```

## Dependencies

Custom skills can use Node.js built-in modules freely. For external packages, add them to the main `darkfactory` project or use dynamic imports.

## Support

For issues or feature requests, create an issue in the `darkfactory` repository or contact the team lead.

---

**Last updated:** 2026-08-26
