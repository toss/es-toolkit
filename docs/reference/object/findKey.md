# findKey

Finds the key of the first element in the object that satisfies the provided testing function.

## Signature

```typescript
function findKey<T extends Record<any, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
): keyof T | undefined;
```

### Parameters

- `obj` (`Record<T, K>`): The object to search.
- `predicate` (`(value: K, key: T, obj: Record<T, K>) => boolean`): The function to execute on each value in the object.

### Returns

(`T | undefined`): The key of the first element in the object that satisfies the provided testing function, or undefined if no element passes the test.

## Examples

```typescript
const users = {
  pebbles: { age: 24, active: true },
  barney: { age: 36, active: true },
  fred: { age: 40, active: false },
};

findKey(users, o => o.age < 40); // 'pebbles'
findKey(users, o => o.age > 50); // undefined
```
