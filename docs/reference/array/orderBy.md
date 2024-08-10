# orderBy

Sorts an array of objects based on multiple properties and their corresponding order directions.

This function takes an array of objects, an array of keys to sort by, and an array of order directions.
It returns the sorted array, ordering by each key according to its corresponding direction
('asc' for ascending or 'desc' for descending). If values for a key are equal,
it moves to the next key to determine the order.

::: info
In JavaScript, if one of the values being compared is of type `string` and the other is of type `number`, JavaScript will implicitly convert the `string` to a `number` before comparing them. If the `string` value becomes `NaN` during this type coercion, any comparison will return `false`, potentially leading to unexpected results.

To prevent this, `es-toolkit` converts the `number` to a `string` for comparison in such cases. However, the `orderBy` function in `es-toolkit/compat` does not perform this conversion for compatibility reasons.
:::

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

### General case

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

### Comparing `string` and `number`

```typescript
const data = [
  { id: 1, value: 'a' },
  { id: 2, value: 2 },
  { id: 12, value: 1 },
  { id: 5, value: 'b' },
  { id: 4, value: 2 },
  { id: 43, value: 'c' },
  { id: 24, value: 3 },
  { id: 3, value: '3a' },
  { id: 6, value: '2a' },
  { id: 7, value: '1cs' },
];

const result = orderBy(data, ['value', 'id'], ['asc', 'asc']);
// result will be:
// [
//   { id: 12, value: 1 },
//   { id: 7, value: '1cs' },
//   { id: 2, value: 2 },
//   { id: 4, value: 2 },
//   { id: 6, value: '2a' },
//   { id: 24, value: 3 },
//   { id: 3, value: '3a' },
//   { id: 1, value: 'a' },
//   { id: 5, value: 'b' },
//   { id: 43, value: 'c' },
// ];
```
