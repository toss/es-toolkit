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

Merging two array types merges tuples index by index, and turns any other pair of arrays into an array of both element types.

```typescript
import type { Merge } from 'es-toolkit/types';

type Result = Merge<{ list: number[] }, { list: string[] }>;
// => { list: Array<string | number> }

type Tuple = Merge<[1, 2, 3], ['a']>;
// => ['a', 2, 3]
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

Merging two objects of the same type gives back that type, including when it contains a union such as `string[] | string[][]`.

```typescript
import type { Merge } from 'es-toolkit/types';

type Options = { value: string[] | string[][] };

type Result = Merge<Options, Options>;
// => { value: string[] | string[][] }
```

When both objects have the same key, the second object's type becomes the result.

Merging types that are not plain objects, such as primitives, `Date`, `Map`, `Set`, and functions, uses the second value's type.

```typescript
import type { Merge } from 'es-toolkit/types';

type Target = { createdAt: Date; onChange: () => void; label: string };
type Source = { createdAt: string; onChange: (value: string) => void; label: 'a' | 'b' };

type Result = Merge<Target, Source>;
// => { createdAt: string; onChange: (value: string) => void; label: 'a' | 'b' }
```

A value that could be `null` or `undefined` in the first object disappears from the result type when the second object has a value for it.

```typescript
import type { Merge } from 'es-toolkit/types';

type Defaults = { retry?: { count: number }; tags: string[] | null };
type Overrides = { retry: { count: number }; tags: string[] };

type Result = Merge<Defaults, Overrides>;
// => { retry: { count: number }; tags: string[] }
```

#### Type Parameters

- `T`: Type of the target object.
- `S`: Type of the source object merged into `T`.
