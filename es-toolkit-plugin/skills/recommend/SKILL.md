---
name: recommend
description: Analyze code or requirements and recommend the best es-toolkit functions. Use when the user asks which es-toolkit function to use, needs help finding a utility, or wants alternatives to manual implementations.
argument-hint: '<description of what you need or paste your code>'
allowed-tools: Read, Grep, Glob
---

# Function Recommendation

Recommend the most suitable es-toolkit function for the user's needs, grounded in source code and official documentation.

## Input

$ARGUMENTS — A description of what the user needs, or a code snippet to analyze.

## Why grounding matters

es-toolkit evolves faster than any training data can track. Always verify function existence and behavior from the actual source code in this repository, rather than relying on memorized knowledge. This prevents recommending functions that don't exist or have changed signatures.

## Workflow

### 1. Understand the requirement

Parse $ARGUMENTS to identify:

- What operation the user wants to perform
- What data types are involved (array, object, string, etc.)
- Whether they might need lodash migration help (if so, suggest `/es-toolkit:migrate`)

### 2. Search the local source code first

This is the fastest and most accurate way to find functions. Search across es-toolkit's categories:

```
# Search in src/ for matching function names or descriptions
Grep for keywords in src/{category}/*.ts
```

List subdirectories under `src/` (excluding `_internal` and `compat`) to discover the current categories dynamically. You can also browse `docs/reference/` to discover the full function index — each subdirectory is a category, and each `.md` file is a function.

Read the implementation file to get the exact signature, and the spec file for real usage examples.

### 3. Construct the official doc URL

es-toolkit's documentation URLs follow a predictable pattern — construct them directly instead of fetching:

- `https://es-toolkit.dev/reference/{category}/{functionName}`

### 4. Search local docs when you're unsure

If you can't find a matching function locally or want to discover functions you might be missing:

- **Browse by category**: `Glob docs/reference/{category}/*.md` to list all functions in a category
- **Search by keyword**: `Grep` for the keyword across `docs/reference/**/*.md`
- **Available categories**: array, error, function, map, math, object, predicate, promise, set, string, util

### 5. Respond with this structure

For each recommended function, include:

- Function name and category
- Import path: `import { fn } from 'es-toolkit';`
- Doc link: `https://es-toolkit.dev/reference/{category}/{fn}`
- What it does (from JSDoc in source)
- A code example (from spec file or official docs)
- Why it fits the user's need

When recommending multiple functions, **always include a comparison table**:

| Function         | Input type | Behavior | Performance | Return type |
| ---------------- | ---------- | -------- | ----------- | ----------- |
| (each candidate) | ...        | ...      | ...         | ...         |

Add a **"When to choose which"** section with clear decision criteria — e.g., "Use `groupBy` for categorizing, `countBy` for tallying, `keyBy` for lookup maps."

If no match exists, say so clearly and suggest modern JS alternatives. For lodash-compatible replacements, point users to the `/es-toolkit:migrate` skill.
