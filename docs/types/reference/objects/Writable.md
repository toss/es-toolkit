# Writable

Removes the `readonly` marker from all properties of an object. The inverse of the built-in `Readonly`.

```typescript
type Mutable = Writable<T>;
```

## Usage

### `Writable<T>`

Use it when you want to make a type mutable again after it was locked down with `as const` or `Readonly`.

```typescript
import type { Writable } from 'es-toolkit/types';

type Config = { readonly host: string; readonly port: number };

type MutableConfig = Writable<Config>;
// => { host: string; port: number }

const config: MutableConfig = { host: 'localhost', port: 8080 };
config.port = 3000; // ok
```

`readonly` is removed only from the outermost properties. Nested objects are left untouched, so use it for shallow cases.

#### Type Parameters

- `T`: The object type to make writable.
