# mapValues

Creates a new object with the same keys as the given object, but with values generated
by running each own enumerable property of the object through the iteratee function.

## Signature

```typescript
function mapValues<T extends object, K extends keyof T, V>(
  object: T,
  getNewValue: (value: T[K], key: K, object: T) => V
): Record<K, V>;
```

### Parameters

- `obj` (`T extends object`): The object to iterate over.
- `getNewValue`: (`(value: T[K], key: K, object: T) => V`): The function invoked per own enumerable property.

### Returns

(`Record<K, V>`): A new object with values transformed by the `getNewValue` function.

## Examples

```typescript
const obj = { a: 1, b: 2 };
const result = mapValues(obj, value => value * 2);
console.log(result); // { a: 2, b: 4 }
```
