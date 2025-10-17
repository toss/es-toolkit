# uniqWith

Returns a new array with duplicate elements removed using a comparison function.

```typescript
const uniqueArray = uniqWith(arr, areItemsEqual);
```

## Reference

### `uniqWith(arr, areItemsEqual)`

Use `uniqWith` when you want to remove duplicates based on a custom comparison function that determines if two elements are equal. It only keeps the first occurrence among elements for which the comparison function returns `true`.

```typescript
import { uniqWith } from 'es-toolkit/array';

// Treat numbers with a difference less than 1 as equal and remove duplicates.
const numbers = [1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19];
const result = uniqWith(numbers, (a, b) => Math.abs(a - b) < 1);
console.log(result); // [1.2, 3.2, 5.7, 7.19]

// Compare objects by a specific field and remove duplicates.
const users = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 25 },
];
const uniqueByAge = uniqWith(users, (a, b) => a.age === b.age);
console.log(uniqueByAge);
// [{ id: 1, name: 'John', age: 30 }, { id: 3, name: 'Bob', age: 25 }]

// Compare strings case-insensitively and remove duplicates.
const words = ['Apple', 'APPLE', 'banana', 'Banana', 'cherry'];
const uniqueCaseInsensitive = uniqWith(words, (a, b) => a.toLowerCase() === b.toLowerCase());
console.log(uniqueCaseInsensitive); // ['Apple', 'banana', 'cherry']
```

Complex object comparisons are also possible.

```typescript
import { uniqWith } from 'es-toolkit/array';

const products = [
  { name: 'iPhone', brand: 'Apple', price: 1000 },
  { name: 'Galaxy', brand: 'Samsung', price: 900 },
  { name: 'iPhone', brand: 'Apple', price: 1100 }, // Same name and brand
  { name: 'Pixel', brand: 'Google', price: 800 },
];

// Treat as duplicate if both name and brand are the same.
const uniqueProducts = uniqWith(products, (a, b) => a.name === b.name && a.brand === b.brand);
console.log(uniqueProducts);
// [
//   { name: 'iPhone', brand: 'Apple', price: 1000 },
//   { name: 'Galaxy', brand: 'Samsung', price: 900 },
//   { name: 'Pixel', brand: 'Google', price: 800 }
// ]
```

#### Parameters

- `arr` (`readonly T[]`): The array from which to remove duplicates.
- `areItemsEqual` (`(item1: T, item2: T) => boolean`): A comparison function that determines if two elements are equal. It should return `true` if the elements are considered equal, and `false` otherwise.

#### Returns

(`T[]`): A new array with duplicates removed based on the comparison function. Preserves the order in which they first appear in the original array.
