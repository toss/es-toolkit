---
name: guide
description: es-toolkit usage guide covering installation, import patterns, and setup for Node.js, Bun, Deno, and browsers. Use when the user asks how to install, import, or set up es-toolkit in their project.
argument-hint: '[topic: install, import, setup, bundle, performance]'
allowed-tools: Read, Grep, Glob
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
- `docs/performance.md` or `docs/ko/performance.md` — runtime performance benchmarks

These are authoritative and always up-to-date.

### 2. Answer based on the user's environment

Identify the runtime (Node.js, Bun, Deno, browser) and provide environment-specific guidance.

Key facts to verify from docs:

- **Deno**: `deno add jsr:@es-toolkit/es-toolkit` (note the `jsr:` prefix)
- **Deno import path**: `'@es-toolkit/es-toolkit'` (extra scope vs npm)
- **npm/yarn/pnpm/bun**: `npm install es-toolkit`
- **Import path**: `'es-toolkit'` for strict, `'es-toolkit/compat'` for lodash-compatible
- **Browser/CDN**: jsdelivr, unpkg for UMD (`_` global), esm.sh for ES modules (import map) — see `docs/usage.md` Browsers section for exact snippets

### 3. Cover these topics as relevant

- **Installation**: per-runtime commands
- **Import patterns**: named imports (recommended for tree-shaking), category imports, compat imports. **List all available subpath imports** by reading the `exports` field in `package.json` (e.g., `es-toolkit`, `es-toolkit/compat`, `es-toolkit/array`, etc.) so users see the full set of entry points.
- **Anti-patterns to avoid**: Warn against namespace imports (`import * as _ from 'es-toolkit'`) as they defeat tree-shaking. Always prefer named imports (`import { chunk, debounce } from 'es-toolkit'`).
- **Bundle size**: reference actual numbers from `docs/bundle-size.md`
- **Performance**: 2-3x faster than lodash (from official benchmarks)
- **Type safety**: built-in TypeScript types, 100% test coverage

### 4. Search local docs for additional topics

If the user asks something not covered by the files listed above, search the bundled documentation:

- **Function docs**: `docs/reference/{category}/{functionName}.md`
- **By keyword**: `Grep` across `docs/reference/**/*.md`
- **Other docs**: `docs/usage.md`, `docs/intro.md`, `docs/bundle-size.md`, `docs/performance.md`

### 5. Always include doc links

End responses with relevant links:

```
## Learn More
- Documentation: https://es-toolkit.dev
- API Reference: https://es-toolkit.dev/reference/{relevant-category}
- GitHub: https://github.com/toss/es-toolkit
```
