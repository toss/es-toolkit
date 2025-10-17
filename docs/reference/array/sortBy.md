# sortBy

Returns a new array sorted in ascending order by the given criteria.

```typescript
const sorted = sortBy(arr, criteria);
```

## Reference

### `sortBy(arr, criteria)`

Use `sortBy` when you want to sort an array of objects by multiple properties or computed values. Provide property names or transformation functions as an array, and it sorts in ascending order with priority in that order. It's useful for sorting table data or when complex sorting logic is needed.

```typescript
import { sortBy } from 'es-toolkit/array';

// Sort by a single property.
const users = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 25 },
  { name: 'bob', age: 35 }
];
const byAge = sortBy(users, ['age']);
// Returns: [{ name: 'jane', age: 25 }, { name: 'john', age: 30 }, { name: 'bob', age: 35 }]

// Sort by multiple properties.
const employees = [
  { name: 'john', department: 'engineering', age: 30 },
  { name: 'jane', department: 'hr', age: 25 },
  { name: 'bob', department: 'engineering', age: 35 },
  { name: 'alice', department: 'engineering', age: 25 }
];
const sorted = sortBy(employees, ['department', 'age']);
// Returns: Sort by department first, then by age
// [
//   { name: 'alice', department: 'engineering', age: 25 },
//   { name: 'john', department: 'engineering', age: 30 },
//   { name: 'bob', department: 'engineering', age: 35 },
//   { name: 'jane', department: 'hr', age: 25 }
// ]
```

You can create complex sorting criteria using functions.

```typescript
import { sortBy } from 'es-toolkit/array';

// Mix functions and properties.
const products = [
  { name: 'laptop', price: 1000, category: 'electronics' },
  { name: 'shirt', price: 50, category: 'clothing' },
  { name: 'phone', price: 800, category: 'electronics' }
];

const sorted = sortBy(products, [
  'category',
  item => -item.price // Sort price in descending order
]);
// Returns: Sort by category first, then by highest price

// Sort by computed values.
const words = ['hello', 'a', 'wonderful', 'world'];
const byLength = sortBy(words.map(word => ({ word, length: word.length })), ['length']);
// Returns: Array of objects sorted by string length
```

#### Parameters

- `arr` (`readonly T[]`): The array of objects to sort.
- `criteria` (`Array<((item: T) => unknown) | keyof T>`): Sorting criteria. An array of object property names or transformation functions, with earlier criteria having higher priority.

#### Returns

(`T[]`): Returns a new array sorted in ascending order by the specified criteria.
