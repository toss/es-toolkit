# omit

Creates a new object with specified keys omitted.

This function takes an object and an array of keys, and returns a new object that 
excludes the properties corresponding to the specified keys.

## Signature

```typescript
function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
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
