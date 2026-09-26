# IsEqual

Resolves to `true` when two types are exactly the same, and `false` otherwise.

```typescript
type Same = IsEqual<A, B>;
```

## Usage

### `IsEqual<A, B>`

Use it when you need an exact comparison rather than assignability. Unlike a plain conditional type, it tells `any` apart from every other type, which is handy for catching an accidental `any` in type-level tests.

```typescript
import type { IsEqual } from 'es-toolkit/types';

type A = IsEqual<{ a: string }, { a: string }>; // true
type B = IsEqual<string, 'literal'>; // false

// A plain conditional cannot tell these apart, but IsEqual can.
type C = IsEqual<unknown, any>; // false
type D = IsEqual<any, any>; // true
```

#### Type Parameters

- `A`: The first type to compare.
- `B`: The second type to compare.
