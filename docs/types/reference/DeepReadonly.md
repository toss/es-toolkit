# DeepReadonly

Makes every property of `T` `readonly` recursively. Unlike the built-in `Readonly`, which only affects the first level, it makes properties readonly all the way down into nested objects.

```typescript
type Frozen = DeepReadonly<T>;
```

## Usage

### `DeepReadonly<T>`

Handy for expressing immutable state at the type level.

```typescript
import type { DeepReadonly } from 'es-toolkit/types';

type State = { user: { name: string; tags: string[] } };

type FrozenState = DeepReadonly<State>;
// => { readonly user: { readonly name: string; readonly tags: readonly string[] } }

declare const state: FrozenState;
state.user.name = 'x'; // error: name is readonly.
```

#### Recursion rules

- **Recurses into**: plain objects, arrays/tuples (→ `readonly` arrays/tuples), and `Map`/`Set` (→ `ReadonlyMap`/`ReadonlySet`).
- **Passes through**: functions, `Date`, and `RegExp` are left unchanged.

```typescript
import type { DeepReadonly } from 'es-toolkit/types';

// Arrays/tuples become readonly.
type A = DeepReadonly<number[]>; // readonly number[]

// Map/Set become their readonly versions.
type B = DeepReadonly<Map<string, number>>; // ReadonlyMap<string, number>
type C = DeepReadonly<Set<number>>; // ReadonlySet<number>
```

#### Type Parameters

- `T`: The type to make deeply readonly.
