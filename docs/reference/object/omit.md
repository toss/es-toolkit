# omit

Creates a new object with specified keys omitted.

This function takes an object and an array of keys, and returns a new object that
excludes the properties corresponding to the specified keys.

## Signature

```typescript
function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
```

### Parameters

- `obj` (`T`): The object to omit keys from.
- `keys` (`K[]`): An array of keys to be omitted from the object.

### Returns

(`Omit<T, K>`): A new object with the specified keys omitted.

## Examples

```typescript
const obj = { a: 1, b: 2, c: 3 };
const result = omit(obj, ['b', 'c']);
// result will be { a: 1 }
```

## Compatibility with Lodash

The `omit` function from `es-toolkit/compat` allows you to exclude deep properties from an object.

```typescript
import { omit } from 'es-toolkit/compat';

const obj = { a: { b: { c: 1 } }, d: { e: 2 }, f: { g: 3 }, 'f.g': 4 };
const result = omit(obj, ['a.b.c', 'f.g']);
// result will be { a: { b: {} }, d: { e: 2 }, f: { g: 3 } }
```
