# DeepPartial

Makes every property of `T` optional recursively. Unlike the built-in `Partial`, which only affects the first level, it makes properties optional all the way down into nested objects.

```typescript
type Patch = DeepPartial<T>;
```

## Usage

### `DeepPartial<T>`

Handy for building a patch type that overrides only part of a nested configuration object.

```typescript
import type { DeepPartial } from 'es-toolkit/types';

type Config = {
  server: { host: string; port: number };
  debug: boolean;
};

type ConfigPatch = DeepPartial<Config>;
// => { server?: { host?: string; port?: number }; debug?: boolean }

const patch: ConfigPatch = { server: { port: 8080 } }; // ok, host can be omitted
```

#### Recursion rules

There are set rules for how far it recurses and where it stops.

- **Recurses into**: plain objects, arrays/tuples, and the contents of `Map`/`Set`. Array elements themselves are not made optional (the array does not become sparse).
- **Passes through**: functions, `Date`, and `RegExp` are left unchanged.

```typescript
import type { DeepPartial } from 'es-toolkit/types';

// Arrays recurse into the element type only, and don't become sparse.
type A = DeepPartial<{ tags: string[] }>; // { tags?: string[] }

// Map/Set recurse into their contents.
type B = DeepPartial<Map<string, { x: number }>>; // Map<string, { x?: number }>

// Functions and Date pass through unchanged.
type C = DeepPartial<{ at: Date; run: () => void }>; // { at?: Date; run?: () => void }
```

#### Type Parameters

- `T`: The type to make deeply optional.
