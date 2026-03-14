---
name: guide
description: es-toolkit usage guide covering installation, import patterns, and setup for Node.js, Bun, Deno, and browsers. Use when the user asks how to install, import, or set up es-toolkit in their project.
argument-hint: '[topic: install, import, setup, bundle, performance]'
allowed-tools: Read, Grep, Glob, WebFetch
---

# es-toolkit Usage Guide

Provide guidance on installing, importing, and using es-toolkit across different runtimes.

## Input

$ARGUMENTS — A topic or question about es-toolkit usage.

## Why source-of-truth matters

Installation commands and import paths change across versions. Always verify from the local docs in this repository (`docs/usage.md`, `docs/ko/usage.md`) rather than relying on memorized instructions.

## Workflow

### 1. Check local documentation first

Read the relevant docs from this repository:
- `docs/usage.md` or `docs/ko/usage.md` — installation and import patterns
- `docs/intro.md` or `docs/ko/intro.md` — overview and key features
- `docs/bundle-size.md` or `docs/ko/bundle-size.md` — bundle size data
- `benchmarks/bundle-size/` — raw benchmark numbers

These are authoritative and always up-to-date.

### 2. Answer based on the user's environment

Identify the runtime (Node.js, Bun, Deno, browser) and provide environment-specific guidance.

Key facts to verify from docs:
- **Deno**: `deno add jsr:@es-toolkit/es-toolkit` (note the `jsr:` prefix)
- **Deno import path**: `'@es-toolkit/es-toolkit'` (extra scope vs npm)
- **npm/yarn/pnpm/bun**: `npm install es-toolkit`
- **Import path**: `'es-toolkit'` for strict, `'es-toolkit/compat'` for lodash-compatible

### 3. Cover these topics as relevant

- **Installation**: per-runtime commands
- **Import patterns**: named imports (recommended for tree-shaking), category imports, compat imports
- **Bundle size**: reference actual numbers from `docs/bundle-size.md`
- **Performance**: 2-3x faster than lodash (from official benchmarks)
- **Type safety**: built-in TypeScript types, 100% test coverage

### 4. Only use WebFetch for topics not in local docs

If the user asks something not covered by local documentation:

```
WebFetch("https://es-toolkit.dev/llms.txt", "Find documentation about: {topic}")
```

### 5. Always include doc links

End responses with relevant links:

```
## Learn More
- Documentation: https://es-toolkit.dev
- API Reference: https://es-toolkit.dev/reference/{relevant-category}
- GitHub: https://github.com/toss/es-toolkit
```
