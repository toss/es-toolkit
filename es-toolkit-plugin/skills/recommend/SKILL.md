---
name: recommend
description: Analyze code or requirements and recommend the best es-toolkit functions. Use when the user asks which es-toolkit function to use, needs help finding a utility, or wants alternatives to manual implementations.
argument-hint: '<description of what you need or paste your code>'
allowed-tools: Read, Grep, Glob, Bash
---

# Function Recommendation

Recommend the most suitable es-toolkit function for the user's needs, grounded in source code and official documentation.

## Input

$ARGUMENTS — A description of what the user needs, or a code snippet to analyze.

## Why grounding matters

es-toolkit evolves faster than any training data can track. Always verify function existence, entry point, and behavior from the version installed in the user's project. The skill may be installed as a standalone directory, so never assume the es-toolkit repository or a sibling `docs` directory is available.

## Workflow

### 1. Understand the requirement

Parse $ARGUMENTS to identify:

- What operation the user wants to perform
- What data types are involved (array, object, string, etc.)
- Whether they might need lodash migration help (if so, suggest `/es-toolkit:migrate`)

### 2. Find candidates in the installed package

Run from the package that depends on es-toolkit. In a monorepo this is usually a workspace package, not the repository root. If the project uses Yarn Plug'n'Play, use `yarn node` instead of `node`.

Search runtime entry points with this command, replacing `merge|assign` with terms relevant to the request:

```bash
node --input-type=module -e "
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const pattern = /merge|assign/i;
const pkg = require('es-toolkit/package.json');
const entries = Object.keys(pkg.exports)
  .filter(subpath => subpath !== './package.json' && !subpath.includes('*'))
  .map(subpath => subpath === '.' ? 'es-toolkit' : 'es-toolkit/' + subpath.slice(2));
const modules = await Promise.all(entries.map(entry => import(entry).catch(() => null)));
if (modules.every(module => module == null)) {
  console.error('es-toolkit is not resolvable from ' + process.cwd());
  process.exit(1);
}
const matches = new Map();
for (let index = 0; index < modules.length; index++) {
  const module = modules[index];
  if (module == null) continue;
  for (const name of Object.keys(module)) {
    if (!pattern.test(name)) continue;
    matches.set(name, [...(matches.get(name) ?? []), entries[index]]);
  }
}
for (const [name, entryPoints] of [...matches].sort()) {
  console.log(name.padEnd(24), entryPoints.join(', '));
}
"
```

The output is authoritative for the installed version. A function can exist in more than one entry point, so consider all matches. `es-toolkit/types` is type-only and cannot be imported at runtime; inspect its declaration file instead.

If es-toolkit is not resolvable, say that the installed version cannot be verified. Do not invent a function name.

When the current project is the es-toolkit source repository itself, search `src/` and its specs directly instead of requiring a built package.

### 3. Read the real declaration

Resolve the installed package metadata:

```bash
node -e "console.log(require.resolve('es-toolkit/package.json'))"
```

Read the corresponding declaration under the package's `dist/` directory for the exact signature, JSDoc, and examples. Do not assume a conventional `node_modules` path; use the resolved path. Check the implementation when it is available, especially for mutation and error behavior.

### 4. Construct the official doc URL

es-toolkit's documentation URLs follow a predictable pattern — construct them directly instead of fetching:

- strict: `https://es-toolkit.dev/reference/{category}/{functionName}.html`
- compat: `https://es-toolkit.dev/compat/reference/{category}/{functionName}.html`
- fp: `https://es-toolkit.dev/fp/reference/{functionName}.html`

If you are unsure that a page exists, omit the page link rather than guessing.

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
