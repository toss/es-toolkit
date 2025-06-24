# Contributing to es-toolkit

We welcome contribution from everyone in the community. All communications in this repository will be in English.

> Every contributor to es-toolkit should adhere to our Code of Conduct. Please read the [full text](./CODE_OF_CONDUCT.md) to understand what actions will and will not be tolerated.

## 1. Our Design Principles

Note that we value performance, simplicity of implementation, and detailed documentations. We do not aim for supporting a variety of features and options. Our goal is to provide a small set of performant and well-functioning utilities.

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

#### `es-toolkit/compat`

To help projects using [`lodash`](https://lodash.com/docs/4.17.15) migrate easily to es-toolkit, we implement all functions provided by `lodash`.

### 1.2 Performance

All functions es-toolkit provides should be more performant than or similar with that of alternative libraries provide.

We measure the performance of our library every time our code is edited. We are using [vitest's benchmark feature](https://vitest.dev/api/#bench). For our benchmark code, please refer to our [benchmark directory](https://github.com/toss/es-toolkit/tree/main/benchmarks).

When a new functionality is added, a benchmark code should be added. Please add screenshots of the benchmarks when opening a pull request for easy reference and history tracking.

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

### 1.4 Documentation

All of our functions should be documented in detail for easy reference. All functions should have the jsdoc and corresponding documents [in our documentation directory](https://github.com/toss/es-toolkit/tree/main/docs) for all of their features.

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
- [Requesting a new feature or package](https://github.com/toss/es-toolkit/issues/new/choose)
- [Having a look at our issue list](https://github.com/toss/es-toolkit/issues) to see what's to be fixed

## 4. Pull Requests

> [Opening a pull request](https://github.com/toss/es-toolkit/compare) <br/>

You can raise your own pull request. The title of your pull request should match the following format:

```
<type>[function names]: <description>
```

> We do not care about the number, or style of commits in your history, because we squash merge every PR into main. <br/>
> Feel free to commit in whatever style you feel comfortable with.

### 4.1 Type

**Type must be one of those**

if you changed shipped code :

- feat - for any new functionality additions
- fix - for any fixes that don't add new functionality

if you haven't changed shipped code :

- docs - if you only change documentation
- test - if you only change tests

other :

- chore - anything else

### 4.2 Function Names

The name of function that you made changes. (ex: debounce, throttle)<br/>
If you made changes across multiple packages, writing package scope is optional.

### 4.3 Description

A clear and concise description of what the pr is about.
