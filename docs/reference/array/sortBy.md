# sortBy

Sorts an array of objects based on the given `criteria`.

- If you provide keys, it sorts the objects by the values of those keys.
- If you provide functions, it sorts based on the values returned by those functions.

The function returns the array of objects sorted in ascending order. If two objects have the same value for the current criterion, it uses the next criterion to determine their order.

## Signature

```typescript
function sortBy<T extends object>(arr: T[], criteria: Array<keyof T | ((item: T) => unknown)>): T[];
```

### Parameters

- `arr` (`T[]`): The array of objects to be sorted.
- `criteria` (`Array<keyof T | ((item: T) => unknown)>`): The criteria for sorting. This can be an array of object keys or functions that return values used for sorting.

### Returns

(`T[]`) The ascendingly sorted array of objects.

## Example

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
