# Merge

Creates a type that deeply merges two object types.

```typescript
type Result = Merge<Target, Source>;
```

## Usage

### `Merge<T, S>`

Use `Merge` when you need the type of the result of deeply merging two objects — for example, the type of a configuration after applying overrides with [merge](../../../reference/object/merge.md).

```typescript
import type { Merge } from 'es-toolkit/types';

type Defaults = { host: string; port: number };
type Overrides = { debug: boolean };

type Config = Merge<Defaults, Overrides>;
// => { host: string; port: number; debug: boolean }
```

Nested objects are merged as well. TypeScript's built-in merge type `T & S` does not merge nested objects, but the `Merge` type does.

```typescript
import type { Merge } from 'es-toolkit/types';

type Target = { server: { host: string; port: number } };
type Source = { server: { tls: boolean } };

type Result = Merge<Target, Source>;
// => { server: { host: string; port: number; tls: boolean } }
```

When keys overlap, the value type of the second object is used. With TypeScript's built-in merge type `T & S`, the value of an overlapping key can show up as `never`, but with the `Merge` type the second object's value type is used.

```typescript
import type { Merge } from 'es-toolkit/types';

type Target = { id: string; value: string };
type Source = { value: number };

type Result = Merge<Target, Source>;
// => { id: string; value: number }

type Broken = Target & Source;
// => { id: string; value: never } (string & number becomes never)
```

### How the result type is decided

The result is decided by the first rule that applies. The same rules are applied again to each key that both objects share.

1. If both types are exactly the same, that type is returned as-is.
2. If both are plain objects, they are merged key by key. Keys present on only one side are kept.
3. If one type is assignable to the other, the wider type is used. When both are assignable to each other, the first type wins.
4. Otherwise, tuples are merged index by index, other arrays become an array of both element types, and any other value (primitives, `Date`, `Map`, functions, ...) is replaced by the second value.

Rule 1 and rule 3 keep unions intact. Without them, a union such as `string | string[] | string[][]` would be merged member by member, and the result would be wider than the input.

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { color: string | string[] | string[][]; label: 'a' | 'b' | (string & {}) };

type Same = Merge<Options, Options>;
// => Options (rule 1)

type Override = Merge<Options, { color: string[] }>;
// => Options (rule 3: string[] is assignable to Options['color'])

type Extra = Merge<{ a: number }, { a: number; b: string }>;
// => { a: number; b: string } (rule 2 runs before rule 3, so `b` is kept)
```

#### Type Parameters

- `T`: Type of the target object.
- `S`: Type of the source object merged into `T`.
