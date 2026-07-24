# Simplify

Flattens an intersection or mapped type into a single, flat object type. The type is the same, but editors show it as `{ a: 1; b: 2 }` instead of `A & B`.

```typescript
type Flat = Simplify<T>;
```

## Usage

### `Simplify<T>`

An intersection (`&`) left as-is shows up as `A & B` in editor tooltips, which makes the real shape hard to read. Wrapping it in `Simplify` expands the final properties into one object. The `?` (optional) and `readonly` markers are preserved.

```typescript
import type { Simplify } from 'es-toolkit/types';

type A = { name: string };
type B = { readonly age?: number };

// Without wrapping, the tooltip shows 'A & B'.
type Raw = A & B;

// Simplify expands it into one object. The ? and readonly markers are kept.
type User = Simplify<A & B>;
// => { name: string; readonly age?: number }
```

#### Type Parameters

- `T`: The type to flatten.
