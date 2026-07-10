# es-toolkit LLM coding agent instructions

This file gives LLM coding agents the context they need to contribute to es-toolkit. Read it before making changes, and follow it together with [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md) (and its translations).

## Project overview

es-toolkit is a modern, high-performance JavaScript utility library with a small bundle size and strong type annotations. It provides a curated set of utilities that are difficult to write with built-in JavaScript methods but are commonly needed in real-world projects, such as [`delay`](https://es-toolkit.dev/reference/promise/delay.html), [`windowed`](https://es-toolkit.dev/reference/array/windowed.html), [`keyBy`](https://es-toolkit.dev/reference/array/keyBy.html), [`mapValues`](https://es-toolkit.dev/reference/object/mapValues.html), [`camelCase`](https://es-toolkit.dev/reference/string/camelCase.html), and [`toSnakeCaseKeys`](https://es-toolkit.dev/reference/object/toSnakeCaseKeys.html).

The library is split into two entry points:

- **`es-toolkit`** — the strict, opinionated main library. Focused on the 85% use case with a simple interface, no complex options, and modern JavaScript semantics.
- **`es-toolkit/compat`** — a Lodash-compatible variant intended to make migration from Lodash easy. Compat is feature-complete; only behavior fixes against Lodash are accepted, not new functions.

es-toolkit is a zero-dependency library and ships with no runtime dependencies.

## Development environment

- **Primary environment**: Node.js v24 (see `.nvmrc` for the exact version)
- **Recommended editor**: Visual Studio Code
- **Package manager**: Yarn v4, installed via [Corepack](https://yarnpkg.com/getting-started/install). See [the package manager section in CONTRIBUTING.md](./.github/CONTRIBUTING.md#package-manager) for details.

To get started:

```bash
corepack enable
yarn install
```

Common commands:

```bash
yarn vitest run                   # Run all tests
yarn vitest run src/array/chunk   # Run tests for a specific function
yarn lint                         # ESLint
tsc --noEmit                      # Typecheck
```

## Repository structure

```
src/
  {category}/{fn}.ts          Implementation for the main `es-toolkit` library
  {category}/{fn}.spec.ts     Unit tests (vitest)
  compat/{category}/{fn}.ts   Lodash-compatible variant under `es-toolkit/compat`
  index.ts                    Top-level barrel re-exports
  {category}/index.ts         Per-category barrel re-exports
docs/
  reference/{category}/{fn}.md          English reference docs
  ko/reference/{category}/{fn}.md       Korean reference docs
  ja/reference/{category}/{fn}.md       Japanese reference docs
  zh_hans/reference/{category}/{fn}.md  Simplified Chinese reference docs
benchmarks/                   Vitest benchmark suite
tests/types/                  Type tests comparing `es-toolkit/compat` with `@types/lodash` (run with `yarn workspace type-tests test`)
.github/CONTRIBUTING.md       Contribution guide (English / Korean / Simplified Chinese)
CHANGELOG.md                  User-facing changelog
```

Categories include `array`, `function`, `math`, `object`, `predicate`, `promise`, `set`, `string`, `util`, `error`, and `map`.

## Principles

es-toolkit values **performance**, **simplicity**, and **detailed documentation** over a wide surface area of features and options.

- **Performance**: every function should match or beat alternative libraries. New features must come with benchmarks.
- **Simplicity**: provide the simplest interface for the 85% use case; do not add complex options for every edge case.
- **Don't reimplement modern JS**: skip functions that are already covered by built-ins (`Array.isArray`, `Number.isNaN`, `Math.min`, `typeof value === 'number'`, etc.) or by TC39 proposals at Stage 3 or above.
- **Accurate types**: match the inference behavior of TypeScript's `strict` mode.
- **Two entry points, two policies**: `es-toolkit` is the opinionated API; `es-toolkit/compat` mirrors Lodash for migration. Compat is feature-complete — only behavior fixes against Lodash are accepted, not new functions.

For the full text, see [Section 1 of CONTRIBUTING.md](./.github/CONTRIBUTING.md#1-our-design-principles).

## Coding conventions

- Prefer `for` loops over `reduce`. Local mutability is fine.
- Prefer built-in JavaScript over custom helpers (`Array.isArray()` over `isArray()`, `typeof value === 'string'` over `isString()`).
- Use short type parameter names: `T` for elements, `K` for keys, `E` for errors.
- Use `readonly T[]` for array parameters that are not mutated.
- Write detailed JSDoc with `@template`, `@param`, `@returns`, `@throws`, and `@example` blocks.

For the full text, see [Section 2 of CONTRIBUTING.md](./.github/CONTRIBUTING.md#2-coding-conventions).

## Development workflow

When adding or changing a function, follow this order:

1. **Add the implementation** under `src/{category}/{fn}.ts` (or `src/compat/{category}/{fn}.ts` for compat-only fixes). Re-export it from `src/{category}/index.ts` and `src/index.ts`.
2. **Add unit tests** with vitest in `src/{category}/{fn}.spec.ts`. Cover the happy path, edge cases (empty input, `null`/`undefined`, large input), and any Lodash-specific behavior in compat.
3. **Run the unit tests**:
   ```bash
   yarn vitest run src/{category}/{fn}
   ```
   Then run the full suite (`yarn vitest run`), `yarn lint`, and `tsc --noEmit` before opening the PR.
4. **Add documentation in all four languages** under `docs/`:

   - `docs/reference/{category}/{fn}.md` (English)
   - `docs/ko/reference/{category}/{fn}.md` (Korean, 해요체)
   - `docs/ja/reference/{category}/{fn}.md` (Japanese)
   - `docs/zh_hans/reference/{category}/{fn}.md` (Simplified Chinese)

   See `docs/CLAUDE.md` for translation tables, and the [Writing Documentation section in CONTRIBUTING.md](./.github/CONTRIBUTING.md#5-writing-documentation) for the template and placeholder rules.

## Documentation standards

- Include JSDoc comments for every public API. Keep `@template`, `@param`, `@returns`, `@throws`, and `@example` up to date.
- Update the documentation whenever you change a public API. Keep all four language versions in sync — never leave one stale.
- Include realistic examples for new features. Prefer descriptive variable names over magic values so readers can infer the interface from the example.

## Pull request standards

PR titles follow `<type>[function names]: <description>`. See [Section 4 of CONTRIBUTING.md](./.github/CONTRIBUTING.md#4-pull-requests) for the type list.

Use the following template for the PR body:

```markdown
## Summary

{Related issues if any}
{Concise summary}

## Changes

{Concise explanation of the code changes, in bullet points}

## Test results

{Output of `yarn vitest run`, in simplified form}
```

## Adding dependencies

es-toolkit is a **zero-dependency** library. Do not add anything to `dependencies` or `peerDependencies`. Only `devDependencies` are acceptable, and even there, prefer to avoid new packages unless they are clearly necessary for tooling.

## Changelog

User-facing changes go into [`CHANGELOG.md`](./CHANGELOG.md). Keep the file readable as a release notes document for users, not as a commit log.

Conventions:

- **Reverse chronological order** — newest version at the top.
- Each version is a heading: `## Version v{version}`, followed by a `Released on {date}.` line.
- Use `-` for list items. Wrap lines at roughly 80 columns and indent continuations with 4 spaces.
- Write **user-facing descriptions**: what changed, why it matters, and what users should do. Avoid implementation jargon.
- Reference PRs with `[#123]` markers inline. When a section has many references, you may add reference link definitions at the end of that section in the form `[#123]: https://github.com/toss/es-toolkit/pull/123`.
- For external contributors, credit them on the line: `[#123] by @username`.
- End each version section with a thank-you line:

  > We sincerely thank @username1, @username2, and @username3 for their contributions. We appreciate your great efforts!
