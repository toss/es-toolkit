# sortBy

Sorts an array of objects based on the given `iteratees` (or keys) in ascending order.

This function takes an array of objects, an array of iteratees (or keys) to sort by.
It returns the ascendingly sorted array of objects.
If `iteratees` are keys of the object, it sorts based on the values of the keys.
If `iteratees` are iteratee functions, it sorts based on the return values of the functions.
If values for a key are equal, it moves to the next key to determine the order.

> An `iteratee` is a function that takes an object and returns a value.

## Signature

```typescript
function sortBy<T extends object>(collection: T[], iteratees: Array<Iteratee<T>> | Array<keyof T>): T[];
```

### Parameters

- `collection` (`T[]`): The array of objects to be sorted.
- `iteratees` (`Array<Iteratee<T>> | Array<keyof T>`): The array of iteratees or keys to sort by.

### Returns

(`T[]`) The ascendingly sorted array of objects.

## Examples

```typescript
const users = [
  { user: 'foo', age: 24 },
  { user: 'bar', age: 7 },
  { user: 'foo ', age: 8 },
  { user: 'bar ', age: 29 },
];

sortBy(users, ['user', 'age']);
sortBy(users, [obj => obj.user, obj => obj.age]);
// results will be:
// [
//   { user : 'bar', age: 7 },
//   { user : 'bar', age: 29 },
//   { user : 'foo', age: 8 },
//   { user : 'foo', age: 24 },
// ]
```
