# Contributing to es-toolkit

We welcome contribution from everyone in the community. All communications in this repository will be in English.

> Every contributor to es-toolkit should adhere to our Code of Conduct. Please read the [full text](./CODE_OF_CONDUCT.md) to understand what actions will and will not be tolerated.

## AI Usage Policy

We encourage you to use AI to assist you in researching, creating, and reviewing contributions. Used well it is a good tool, and we use it ourselves.

However, you must review and deeply understand what you submit. For this reason, **issue and pull request descriptions from external contributors must be written by a human**. You can still use AI to help you build a reproduction or find your way around the codebase—the rule is about the description, because that is what a maintainer reads first when deciding whether a report makes sense.

You are responsible for everything you send under your name, including code that an AI wrote for you. When a contribution has clearly not been read by the person sending it—a description that does not match the diff, a reproduction that was never run, a fix for a problem that does not exist—we will close it without a detailed review.

## Package Manager

This project uses **Yarn 4** as its package manager. The correct version is automatically installed via Corepack when you run `yarn install`.

To get started:

1. Make sure you have Node.js installed (see `.nvmrc` for the required version)
2. Enable Corepack: `corepack enable`
3. Install dependencies: `yarn install`

## 1. Our Design Principles

Note that we value performance, simplicity of implementation, and detailed documentation. We do not aim for supporting a variety of features and options. Our goal is to provide a small set of performant and well-functioning utilities.

### 1.1 Development Scope

#### `es-toolkit`

es-toolkit is a high-quality library of utility functions commonly used in modern JavaScript projects.

We focus on implementing functions that are difficult to create with JavaScript's built-in methods but are frequently needed and useful.

Examples include [`delay`](https://es-toolkit.dev/reference/promise/delay.html), [`windowed`](https://es-toolkit.dev/reference/array/windowed.html), [`keyBy`](https://es-toolkit.dev/reference/array/keyBy.html), [`mapValues`](https://es-toolkit.dev/reference/object/mapValues.html), [`camelCase`](https://es-toolkit.dev/reference/string/camelCase.html), and [`toSnakeCaseKeys`](https://es-toolkit.dev/reference/object/toSnakeCaseKeys.html).

We don't implement functions that can be easily replaced with modern JavaScript, such as:

- `isArray` (use `Array.isArray` instead)
- `isNaN` (use `Number.isNaN` instead)
- `isNumber` (use `typeof value === 'number'` instead)
- `min` (use `Math.min()` instead)

For functions covered by TC39 proposals, we won't implement them once they reach Stage 3.
We may consider adding functions from earlier proposals (Stage 2.7 or below) if there's a clear need, but we'll deprecate them once the proposal advances to Stage 3 or beyond—since at that point, using the native implementation is the better choice.

#### `es-toolkit/compat`

To help projects using [`Lodash`](https://lodash.com/docs/4.17.15) migrate easily to es-toolkit, `es-toolkit/compat` mirrors the functions provided by `Lodash`.

`es-toolkit/compat` is feature-complete. We no longer add functions to it—we only fix behavior that differs from Lodash.

### 1.2 Performance

All functions es-toolkit provides should be more performant than or similar with that of alternative libraries provide.

We measure the performance of our library every time our code is edited. We are using [Vitest's benchmark feature](https://vitest.dev/api/#bench). For our benchmark code, please refer to our [benchmark directory](https://github.com/toss/es-toolkit/tree/main/benchmarks).

When a new function is added, benchmark code should be added along with it. See [4.1 What we accept](#41-what-we-accept) for what to attach when you open a pull request.

### 1.3 Simplicity

We value implementation and interface simplicity over a variety of features for performance, code readability, and easy maintenance. Our functions will not provide complex options to suit every use case.

In this manner, instead of having complex options of making full use of overloading, etc, to support edge cases, we aim to provide the simplest interface and implementation for the most common 85% use cases.

We recognize that there are multiple approaches to achieving the same functionality. If the performance difference is less than 10%, please follow our coding style guidelines:

<details>
<summary>
1. Prefer <code>for</code> loops over <code>reduce</code>.
</summary>

In most cases, we prefer using `for` loops over `reduce`. This is because maintaining immutability with `reduce` can be challenging without tools like [immer](https://github.com/immerjs/immer), and functional programming typically allows local mutability.

For instance, we prefer implementing `keyBy` using a `for ... of` loop instead of `reduce`.

```typescript
export function keyBy<T, K extends PropertyKey>(arr: readonly T[], getKeyFromItem: (item: T) => K): Record<K, T> {
  const result = {} as Record<K, T>;

  for (const item of arr) {
    const key = getKeyFromItem(item);
    result[key] = item;
  }

  return result;
}
```

</details>

<details>
<summary>
2. Prefer built-in JavaScript functions and operators.
</summary>

We prefer using built-in JavaScript functions, methods, or operators like `Array.isArray()`, `typeof value === 'string'`, and `Number.isNaN()`. Avoid using custom functions such as `isArray()`, `isString()`, or `isNaN()` from `es-toolkit` or other libraries.

This helps keep the code more concise, eliminates unnecessary function calls, and reduces coupling between functions.

</details>

### 1.4 Types

Accurate types are a core goal of es-toolkit, and so is consistency with TypeScript's own type behavior.

es-toolkit aims to return the same types as TypeScript's [`strict` mode](https://www.typescriptlang.org/tsconfig/#strict)—the most widely used configuration. For example, `result1` and `result2` below should have the same type, since `result2` is essentially just a wrapper around what `result1` does directly:

```typescript
import { sample } from 'es-toolkit';

const arr = [1, 2, 3];

const result1 = arr[Math.floor(Math.random() * arr.length)]; // inferred as `number` in TypeScript strict mode
const result2 = sample(arr); // should likewise be inferred as `number`
```

Options that default to `false` even within strict mode—such as [noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html)—are not considered when determining type compatibility in es-toolkit.

### 1.5 Documentation

All of our functions should be documented in detail for easy reference. All functions should have the JSDoc and corresponding documents [in our documentation directory](https://github.com/toss/es-toolkit/tree/main/docs) for all of their features.

Our primary language is English, but we strive to support documents in Korean, Japanese, and Simplified Chinese as well. If you have trouble writing documents in a foreign language, please let our contributors know, and we will help provide the necessary translations.

## 2. Coding Conventions

Here are the coding conventions we follow in the `es-toolkit` repository:

### 2.1 Use short names for type parameters

- Use `T` for elements, like in [difference](https://es-toolkit.dev/reference/array/difference.html).
- Use `E` for errors, like in [attempt](https://es-toolkit.dev/reference/util/attempt.html).
- Use `K` for keys, like in [groupBy](https://es-toolkit.dev/reference/array/groupBy.html).

## 3. Issues

You can contribute to es-toolkit via:

- Improving our [docs](https://es-toolkit.dev)
- [Reporting a bug in our issues tab](https://github.com/toss/es-toolkit/issues/new/choose)
- [Proposing a new function in discussions](https://github.com/toss/es-toolkit/discussions/new?category=ideas)
- [Having a look at our issue list](https://github.com/toss/es-toolkit/issues) to see what's to be fixed

## 4. Pull Requests

> [Opening a pull request](https://github.com/toss/es-toolkit/compare) <br/>

You can raise your own pull request. The title of your pull request should match the following format:

```
<type>[function names]: <description>
```

> We do not care about the number, or style of commits in your history, because we squash merge every PR into main. <br/>
> Feel free to commit in whatever style you feel comfortable with.

### 4.1 What we accept

Anything we merge has to be maintained for as long as the library exists, and we already have a long queue of open pull requests waiting for review. So we accept a narrow set of changes, and we would rather tell you which ones up front than let you find out after the work is done.

Please read the section that matches your change before you start writing code.

#### Adding a new function

**Open a [discussion](https://github.com/toss/es-toolkit/discussions/new?category=ideas) first and wait until it is accepted.** A pull request that adds a function without one will be closed, even when the implementation itself is good.

This is not because we dislike new functions. It is because adding one is a long-term promise: it has to be documented in four languages, it has to stay at least as fast as the alternatives, and once people depend on it we cannot take it back. There may also be a reason the function is not here yet—it might be replaceable with a built-in, or it might be on its way into JavaScript itself through a TC39 proposal (see [1.1 Development Scope](#11-development-scope)). A discussion settles all of that before you spend an evening on an implementation.

Once the discussion is accepted, your pull request should include the implementation, tests, a benchmark, and documentation in all four languages.

`es-toolkit/compat` is a special case. It exists to mirror Lodash so that projects can migrate, and it already covers everything Lodash provides, so we do not add new functions to it at all.

#### Improving performance

**Welcome, as long as you attach benchmark results.** Please run the benchmark on `main` and on your branch, and paste both results into the pull request.

We ask for this because we cannot tell an actual improvement from a change that only looks faster by reading the code. Modern JavaScript engines optimize in ways that are hard to predict, and a rewrite that seems tighter often measures the same or slower. If a pull request claims a speedup without numbers, we have no way to check it, so we close it.

Our benchmarks use [Vitest's benchmark feature](https://vitest.dev/api/#bench) and live in the [benchmark directory](https://github.com/toss/es-toolkit/tree/main/benchmarks).

#### Fixing behavior that differs from Lodash

**Welcome.** This applies to `es-toolkit/compat`, where matching Lodash exactly is the entire point—if we return something different, migrating projects break in ways that are hard to trace.

Show the difference as code instead of describing it: the exact input, what Lodash returns for it, and what `es-toolkit/compat` returns today. Add a test that fails before your change and passes after it, so the behavior stays fixed. If the function you are touching runs in a hot path, attach benchmark results as well—these fixes tend to add branches to code that runs very often.

#### Fixing documentation

**Always welcome, with none of the requirements above.** Just keep the four language versions in sync, and see [5. Writing Documentation](#5-writing-documentation) for the template.

One request: if you spot several small things—a typo here, a missing parameter there—please collect them into a single pull request instead of opening one for each. A stream of one-line pull requests costs more review time in total than the same fixes bundled together, and it pushes everyone else's work further down the queue.

#### Refactoring on its own

**We do not accept these.** That means renaming variables, splitting a function into smaller pieces, or rewriting an implementation that already works, when nothing about the behavior changes.

We understand why this is tempting, and the code is not always as clean as we would like. But a refactoring pull request costs a reviewer just as much attention as any other change while giving users nothing, and rewrites quietly break edge cases more often than you would expect—especially in `es-toolkit/compat`, where odd-looking code is usually there to match an odd Lodash behavior.

If you did find something worth cleaning up, the way in is to bundle it with a bug fix or with a performance improvement we can measure. Then the cleanup comes with a reason to review it.

### 4.2 Type

**Type must be one of those**

if you changed shipped code :

- feat - for any new functionality additions
- fix - for any fixes that don't add new functionality

if you haven't changed shipped code :

- docs - if you only change documentation
- test - if you only change tests

other :

- chore - anything else

### 4.3 Function Names

The name of function that you made changes. (ex: debounce, throttle)<br/>
If you made changes across multiple packages, writing package scope is optional.

### 4.4 Description

A clear and concise description of what the pr is about.

## 5. Writing Documentation

Every function ships docs in four languages. Keep them in sync:

- `docs/reference/{category}/{fn}.md` (English)
- `docs/ko/reference/{category}/{fn}.md` (Korean, in 해요체)
- `docs/ja/reference/{category}/{fn}.md` (Japanese)
- `docs/zh_hans/reference/{category}/{fn}.md` (Simplified Chinese)

For canonical examples, see [`sum`](../docs/reference/math/sum.md) and [`toCamelCaseKeys`](../docs/reference/object/toCamelCaseKeys.md).

### 5.1 Template

````markdown
# {function name}

{one-line description}

```typescript
{short example code}
```

## Usage

### `{signature}`

{Short paragraph: when to use it, then how it behaves. Add inline examples between paragraphs as needed.}

```typescript
import { {function name} } from 'es-toolkit/{category}';

// Short comment describing what this example shows.
{example call}
// Returns: {result}
```

#### Parameters

- `{name}` (`{type}`): {description}.
- `{name}` (`{type}`, optional): {description}. Defaults to `{default}`.

#### Returns

(`{type}`): {description}.
````

### 5.2 Filling it in

- **Title**: the function name with no suffix (`# sum`, `# toCamelCaseKeys`).
- **One-line description**: summarize the behavior in one sentence. If a non-obvious term appears (e.g. "camelCase"), add one short follow-up paragraph explaining it.
- **Short example code**: use descriptive variable names (`arr`, `numbers`, `obj`) over concrete values so the interface is obvious at a glance.
- **`### \`signature\``**: one heading per overload. Merge overloads when possible; split only when the behavior is genuinely different (e.g. arrays vs. objects).
- **Body prose**: lead with "when to use it", then describe behavior in flowing sentences — never the "Description: …" colon style. Open each example block with `import { ... } from 'es-toolkit/{category}'` and put a one-line comment above each call.
- **Parameters**: ``- `name` (`type`): description.``. For optionals, append `optional` to the type and include the default.
- **Returns**: type in parentheses first, then the description.

### 5.3 Style

- Use plain words (e.g. "arrays of the same length" instead of "uniform arrays").
- Prefer everyday JavaScript terms (e.g. "array or object" instead of "collection").
- In non-English versions, unfold English jargon into a natural local-language phrase (e.g. "값이 참으로 평가되는" instead of "truthy").
