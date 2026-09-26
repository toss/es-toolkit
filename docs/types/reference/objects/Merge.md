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

#### Type Parameters

- `T`: Type of the target object.
- `S`: Type of the source object merged into `T`.
