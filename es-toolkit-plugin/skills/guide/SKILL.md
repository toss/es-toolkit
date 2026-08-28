---
name: guide
description: es-toolkit usage guide covering installation, import patterns, and setup for Node.js, Bun, Deno, and browsers. Use when the user asks how to install, import, or set up es-toolkit in their project.
argument-hint: '[topic: install, import, setup, bundle, performance]'
allowed-tools: Read, Grep, Glob, Bash
---

# es-toolkit Usage Guide

Provide guidance on installing, importing, and using es-toolkit across different runtimes.

## Input

$ARGUMENTS — A topic or question about es-toolkit usage.

## Why source-of-truth matters

Installation commands and import paths change across versions. When es-toolkit is already installed, verify its version and exports from the installed package. The skill may be installed as a standalone directory, so never assume the es-toolkit repository or a sibling `docs` directory is available.

## Workflow

### 1. Inspect the user's project

Detect the package manager from its lockfile:

- `package-lock.json` → npm
- `yarn.lock` → Yarn
- `pnpm-lock.yaml` → pnpm
- `bun.lock` or `bun.lockb` → Bun

If es-toolkit is installed, resolve its package metadata from the package that depends on it:

```bash
node -e "console.log(require.resolve('es-toolkit/package.json'))"
```

Run the command from the relevant workspace package, not automatically from a monorepo root. If the project uses Yarn Plug'n'Play, use `yarn node` instead of `node`. Read the resolved `package.json` to verify the installed version and its `exports`.

If the command fails because es-toolkit is not installed yet, continue with the installation guidance below; do not search for repository-relative files.

### 2. Answer based on the user's environment

Identify the runtime (Node.js, Bun, Deno, browser) and provide environment-specific guidance.

Stable setup facts:

- **Deno**: `deno add jsr:@es-toolkit/es-toolkit` (note the `jsr:` prefix)
- **Deno import path**: `'@es-toolkit/es-toolkit'` (extra scope vs npm)
- **npm/yarn/pnpm/bun**: Provide the command matching the detected package manager. If no lockfile exists, ask which package manager the user prefers or show the available commands.
- **Import path**: `'es-toolkit'` for strict, `'es-toolkit/compat'` for lodash-compatible
- **Browser/CDN**: jsdelivr and unpkg provide the UMD build (`_` global), while esm.sh provides ES modules. Link to the official usage page below for current snippets.

### 3. Cover these topics as relevant

- **Installation**: per-runtime commands
- **Import patterns**: named imports (recommended for tree-shaking), category imports, and compat imports. If the package is installed, list available subpath imports from the resolved package's `exports` instead of using a memorized list.
- **Anti-patterns to avoid**: Warn against namespace imports (`import * as _ from 'es-toolkit'`) as they defeat tree-shaking. Always prefer named imports (`import { chunk, debounce } from 'es-toolkit'`).
- **Bundle size and performance**: Link to the official pages below. Quote exact numbers only when the user supplied them or the current repository checkout contains the benchmark data; do not retain stale figures in the skill.
- **Type safety**: Built-in TypeScript declarations are included with the package.

### 4. Use repository documentation only when it exists

If the current project is the es-toolkit source repository, local files under `docs/` and `src/` are authoritative and can be searched. Otherwise, use the installed package metadata and declarations. Never expect a `docs` directory next to this skill.

### 5. Always include doc links

End responses with relevant links:

```
## Learn More
- Documentation: https://es-toolkit.dev/intro.html
- Usage: https://es-toolkit.dev/usage.html
- Bundle size: https://es-toolkit.dev/bundle-size.html
- Performance: https://es-toolkit.dev/performance.html
- GitHub: https://github.com/toss/es-toolkit
```
