---
name: compat-guide
description: Explain the difference between es-toolkit and es-toolkit/compat, and when to use each. Use when the user is confused about the compat layer, needs migration strategy advice, or wants to understand API differences.
argument-hint: '[function name or topic]'
allowed-tools: Read, Grep, Glob, WebFetch
---

# Compat Layer Guide

Help users understand when to use `es-toolkit` (strict) vs `es-toolkit/compat` (lodash-compatible), grounded in actual source code differences.

## Input

$ARGUMENTS — Optional function name or topic to focus on.

## Core Concepts

**es-toolkit (strict)**: Opinionated, simplified API for the 85% use case. Smaller bundle, may differ from lodash in edge cases by design. New functions are added here.

**es-toolkit/compat**: Matches lodash behavior exactly. Feature-complete — no new functions, only inconsistency fixes accepted.

## Workflow

### If a specific function is given

1. **Read both implementations** from source:
   - `src/{category}/{fn}.ts` — strict
   - `src/compat/{category}/{fn}.ts` — compat
   - Both spec files for behavioral differences

2. **Construct doc URLs**:
   - Strict: `https://es-toolkit.dev/reference/{category}/{fn}.html`
   - Compat: `https://es-toolkit.dev/reference/compat/{category}/{fn}.html`

3. **If the function only exists in compat** (like `get`, `set`, `has`), explain why — es-toolkit doesn't implement functions replaceable by modern JS (optional chaining `?.`, `Object.hasOwn()`, etc.).

4. **Present comparison**:

```
## `{fn}` — es-toolkit vs es-toolkit/compat

### es-toolkit (strict)
**Import**: `import { fn } from 'es-toolkit';`
**Docs**: {url}
{behavior description from source}

### es-toolkit/compat
**Import**: `import { fn } from 'es-toolkit/compat';`
**Docs**: {url}
{behavior description from source}

### Key Differences
| Aspect | es-toolkit | es-toolkit/compat |
|--------|-----------|-------------------|

### Recommendation
{when to use which}
```

### If no specific function (general guide)

Provide strategic overview with three migration options:

- **Option A: Direct to es-toolkit** — new/small projects
- **Option B: Gradual via compat** — large codebases (recommended for legacy)
- **Option C: Mixed** — pragmatic approach

For concrete behavioral differences, read a few representative function pairs from source (e.g., `chunk`, `debounce`) to give real examples rather than abstract descriptions.

### Use WebFetch only when needed

If you need to discover which functions exist only in compat vs both:

```
WebFetch("https://es-toolkit.dev/llms.txt", "List functions available in compat but not in strict es-toolkit")
```
