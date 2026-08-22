# Merge

Deeply merges two object types into one. This is the return type of [`merge`](../../reference/object/merge.md): where the built-in intersection `T & S` can collapse overlapping nested properties to `never`, `Merge<T, S>` combines them property by property, the same way `merge` does at runtime.

```typescript
type Result = Merge<Target, Source>;
```

## Usage

### `Merge<T, S>`

Use `Merge` when you need to name the type of an object produced by deeply merging a source object into a target object — for example, the type of a configuration after applying overrides with [`merge`](../../reference/object/merge.md).

```typescript
import type { Merge } from 'es-toolkit/types';

type Defaults = {
  server: { host: string; port: number };
  debug: boolean;
};

type Overrides = {
  server: { port: 8080; tls: boolean };
};

type Config = Merge<Defaults, Overrides>;
// => { server: { host: string; port: 8080; tls: boolean }; debug: boolean }
```

#### Merge rules

The result follows the same rules `merge` applies at runtime.

- **Keys on one side only**: kept as-is, preserving optionality.
- **Plain objects on both sides**: merged recursively.
- **Arrays on both sides**: tuples merge index by index; other arrays become an array of both element types.
- **`undefined` source values**: the target type is kept, because `merge` does not overwrite a defined value with `undefined`.
- **Non-mergeable values** (functions, `Date`, `RegExp`, `Map`, `Set`, and other non-plain objects): the source value replaces the target value.
- **An array and a plain object**: both property sets are kept (`T & S`), because `merge` assigns the source's properties onto the target.

```typescript
import type { Merge } from 'es-toolkit/types';

// Tuples merge index by index.
type A = Merge<{ a: [1, 2] }, { a: [3] }>; // { a: [3, 2] }

// An undefined source value does not overwrite the target.
type B = Merge<{ a: number }, { a?: string }>; // { a: number | string }

// Non-plain objects are replaced, not merged into.
type C = Merge<{ at: { x: number } }, { at: Date }>; // { at: Date }
```

#### Type Parameters

- `T`: Type of the target object.
- `S`: Type of the source object merged into `T`.
