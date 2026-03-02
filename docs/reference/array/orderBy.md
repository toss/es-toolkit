# orderBy

Returns a new array sorted by multiple criteria and sort directions.

```typescript
const sorted = orderBy(arr, criteria, orders);
```

## Usage

### `orderBy(arr, criteria, orders)`

Use `orderBy` when you want to perform compound sorting on an array of objects with multiple conditions. You can specify ascending or descending order for each criterion, and if values are the same for the first criterion, it sorts by the next criterion.

```typescript
import { orderBy } from 'es-toolkit/array';

// Sort a user array by multiple criteria.
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

orderBy(users, [obj => obj.user, 'age'], ['asc', 'desc']);
// Returns:
// [
//   { user: 'barney', age: 36 },
//   { user: 'barney', age: 34 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 }
// ]

// You can mix property names and functions.
const products = [
  { name: 'Apple', category: 'fruit', price: 1.5 },
  { name: 'Banana', category: 'fruit', price: 0.8 },
  { name: 'Broccoli', category: 'vegetable', price: 2.0 },
];

orderBy(products, ['category', product => product.name.length], ['asc', 'desc']);
// Returns: Sort by category first, then by name length in descending order within the same category
```

If the number of sort directions is less than the number of criteria, the last direction is repeated.

```typescript
import { orderBy } from 'es-toolkit/array';

const data = [
  { a: 1, b: 1, c: 1 },
  { a: 1, b: 2, c: 2 },
  { a: 2, b: 1, c: 1 },
];

orderBy(data, ['a', 'b', 'c'], ['asc', 'desc']);
// 'a' is sorted in ascending order, 'b' and 'c' are sorted in descending order.
```

#### Parameters

- `arr` (`T[]`): The array of objects to sort.
- `criteria` (`Array<((item: T) => unknown) | keyof T>`): The criteria to sort by. You can use property names of objects or functions that return values.
- `orders` (`Array<'asc' | 'desc'>`): An array of sort directions for each criterion. `'asc'` means ascending order, `'desc'` means descending order.

#### Returns

(`T[]`): A new array sorted by the specified criteria and directions.
