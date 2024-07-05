# orderBy

Sorts an array of objects based on multiple properties and their corresponding order directions.

This function takes an array of objects, an array of keys to sort by, and an array of order directions.
It returns the sorted array, ordering by each key according to its corresponding direction
('asc' for ascending or 'desc' for descending). If values for a key are equal,
it moves to the next key to determine the order.

## Signature

```typescript
function orderBy<T>(collection: T[], keys: Array<keyof T>, orders: Order[]): T[];
```

### Parameters

- `collection` (`T[]`): The array of objects to be sorted.
- `keys` (`Array<keyof T>`): An array of keys (properties) by which to sort.
- `orders` (`Order[]`): An array of order directions ('asc' for ascending or 'desc' for descending).

### Returns

(`T[]`) The sorted array.

## Examples

```typescript
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

const result = orderBy(users, ['user', 'age'], ['asc', 'desc']);
// result will be:
// [
//   { user: 'barney', age: 36 },
//   { user: 'barney', age: 34 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 },
// ]
```
