# IsUnknown

Resolves to `true` when a type is `unknown`, and `false` otherwise.

```typescript
type Result = IsUnknown<T>;
```

## Usage

### `IsUnknown<T>`

Use it when a type-level helper should treat an `unknown` input differently from a concrete type. A plain `unknown extends T` check is also `true` for `any`, but `IsUnknown` tells the two apart.

```typescript
import type { IsUnknown } from 'es-toolkit/types';

type A = IsUnknown<unknown>; // true
type B = IsUnknown<any>; // false
type C = IsUnknown<never>; // false
type D = IsUnknown<string>; // false
```

#### Type Parameters

- `T`: The type to check.
