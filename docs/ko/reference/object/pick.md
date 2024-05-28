# pick

Creates a new object composed of the picked object properties.

This function takes an object and an array of keys, and returns a new object that 
includes only the properties corresponding to the specified keys.

## Signature

```typescript
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
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
