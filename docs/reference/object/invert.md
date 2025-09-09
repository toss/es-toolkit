# invert

Creates a new object by swapping the keys and values of the given object.

This function takes an object and creates a new object where the keys are the values and the values are the keys of the original object. If there are duplicate values in the input object, the key that appears last will be used as the new key.

## Signature

```typescript
function invert<K extends PropertyKey, V extends PropertyKey>(obj: Record<K, V>): Record<V, K>;
```

### Parameters

- `obj` (`Record<K, V>`): The object to invert.

### Returns

(`Record<V, K>`): A new object with keys and values inverted.

## Examples

```typescript
const obj = { a: 1, b: 1, c: 2 };
const result = invert(obj);
// result will be { 1: 'b', 2: 'c' }
```
