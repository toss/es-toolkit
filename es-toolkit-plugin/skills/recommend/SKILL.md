---
name: recommend
description: Analyze code or requirements and recommend the best es-toolkit functions. Use when the user asks which es-toolkit function to use, needs help finding a utility, or wants alternatives to manual implementations.
argument-hint: '<description of what you need or paste your code>'
allowed-tools: Read, Grep, Glob, WebFetch
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
- Whether they're looking for a lodash replacement

### 2. Search the local source code first

This is the fastest and most accurate way to find functions. Search across es-toolkit's categories:

```
# Search in src/ for matching function names or descriptions
Grep for keywords in src/{category}/*.ts
```

Categories: `array`, `function`, `math`, `object`, `predicate`, `promise`, `set`, `string`, `util`, `error`, `map`

Read the implementation file to get the exact signature, and the spec file for real usage examples.

### 3. Check compat layer if relevant

If the user mentions lodash or needs lodash-compatible behavior, also search `src/compat/{category}/`.

### 4. Construct the official doc URL

es-toolkit's documentation URLs follow a predictable pattern — construct them directly instead of fetching:

- Strict API: `https://es-toolkit.dev/reference/{category}/{functionName}.html`
- Compat API: `https://es-toolkit.dev/reference/compat/{category}/{functionName}.html`

### 5. Only use WebFetch when you're unsure

If you can't find a matching function locally or want to discover functions you might be missing, consult the documentation index:

```
WebFetch("https://es-toolkit.dev/llms.txt", "Find functions related to: {requirement}")
```

This is a lightweight index — prefer it over `llms-full.txt`.

### 6. Respond with this structure

For each recommended function, include:
- Function name and category
- Import path: `import { fn } from 'es-toolkit';`
- Doc link: `https://es-toolkit.dev/reference/{category}/{fn}.html`
- What it does (from JSDoc in source)
- A code example (from spec file or official docs)
- Why it fits the user's need

Include alternatives if multiple functions could work. If no match exists, say so clearly and suggest modern JS alternatives or `es-toolkit/compat`.
