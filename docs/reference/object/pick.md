# pick

Creates a new object composed of the picked object properties.

This function takes an object and an array of keys, and returns a new object that
includes only the properties corresponding to the specified keys.

## Signature

```typescript
function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
```

### Parameters

- `obj` (`T`): The object to pick keys from.
- `keys` (`K[]`): An array of keys to be picked from the object.

### Returns

(`Pick<T, K>`): A new object with the specified keys picked.

## Examples

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = pick(obj, ['a', 'c']);
// result will be { a: 1, c: 3 }
```

## Compatibility with Lodash

The `pick` function from `es-toolkit/compat` allows you to select deep properties from an object.

```typescript
import { pick } from 'es-toolkit/compat';

const obj = { a: { b: { c: 1 } }, d: { e: 2 }, f: { g: 3 }, 'f.g': 4 };
const result = pick(obj, ['a.b.c', 'f.g']);
// result will be { a: { b: { c: 1 } }, 'f.g': 4 }
```
