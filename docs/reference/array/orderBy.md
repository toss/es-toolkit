# orderBy

Sorts an array of objects based on the given `criteria` and their corresponding order directions.

- If you provide keys, it sorts the objects by the values of those keys.
- If you provide functions, it sorts based on the values returned by those functions.

The function returns the array of objects sorted in corresponding order directions.
If two objects have the same value for the current criterion, it uses the next criterion to determine their order.
If the number of orders is less than the number of criteria, it uses the last order for the remaining criteria.

## Signature

```typescript
function orderBy<T extends object>(
  arr: T[],
  criteria: Array<((item: T) => unknown) | keyof T>,
  orders: Array<'asc' | 'desc'>
): T[];
```

### Parameters

- `arr` (`T[]`): The array of objects to be sorted.
- `criteria` (`Array<keyof T | ((item: T) => unknown)>`): The criteria for sorting. This can be an array of object keys or functions that return values used for sorting.
- `orders` (`Array<'asc' | 'desc'>)`): An array of order directions ('asc' for ascending or 'desc' for descending).

### Returns

(`T[]`) The sorted array.

## Examples

```typescript
// Sort an array of objects by 'user' in ascending order and 'age' in descending order.
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

const result = orderBy(users, [obj => obj.user, 'age'], ['asc', 'desc']);
// result will be:
// [
//   { user: 'barney', age: 36 },
//   { user: 'barney', age: 34 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 },
// ]
```
