# Primitive

A union of every primitive value in JavaScript. Anything that is not a primitive is an object.

```typescript
type Value = Primitive;
```

## Usage

### `Primitive`

Use it when a value may be any primitive but not an object. Writing this union by hand usually misses `bigint` or `symbol`.

```typescript
import type { Primitive } from 'es-toolkit/types';

function isPrimitive(value: unknown): value is Primitive {
  return value === null || (typeof value !== 'object' && typeof value !== 'function');
}

const a: Primitive = 'text';
const b: Primitive = 1n;
const c: Primitive = Symbol('id');

// const d: Primitive = {}; // error, an object is not a primitive
```
