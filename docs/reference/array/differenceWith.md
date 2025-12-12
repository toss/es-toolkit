# differenceWith

Computes the difference of two arrays using a custom comparison function and returns a new array.

```typescript
const result = differenceWith(firstArr, secondArr, areItemsEqual);
```

## Usage

### `differenceWith(firstArr, secondArr, areItemsEqual)`

Use `differenceWith` when you want to compute the difference between two arrays using a custom comparison function. It determines if two elements are equal through the comparison function, and returns elements that exist only in the first array.

```typescript
import { differenceWith } from 'es-toolkit/array';

// Compute the difference based on id in object arrays.
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;
differenceWith(array1, array2, areItemsEqual);
// Returns: [{ id: 1 }, { id: 3 }]
// Elements with id 2 are considered equal and excluded.

// You can compare arrays of different types.
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
const numbers = [2, 4];
const areItemsEqual2 = (a, b) => a.id === b;
differenceWith(objects, numbers, areItemsEqual2);
// Returns: [{ id: 1 }, { id: 3 }]
```

You can compare elements with complex conditions.

```typescript
import { differenceWith } from 'es-toolkit/array';

const users1 = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];
const users2 = [
  { name: 'Alice', age: 31 }, // Same user even if age is different
  { name: 'David', age: 25 },
];

const areUsersEqual = (a, b) => a.name === b.name;
differenceWith(users1, users2, areUsersEqual);
// Returns: [{ name: 'Bob', age: 25 }, { name: 'Charlie', age: 35 }]
```

#### Parameters

- `firstArr` (`T[]`): The base array to compute the difference from.
- `secondArr` (`U[]`): The array containing elements to exclude from the first array.
- `areItemsEqual` (`(x: T, y: U) => boolean`): The function that determines if two elements are equal.

#### Returns

(`T[]`): A new array containing elements that are determined to exist only in the first array according to the comparison function.

## Lodash Compatibility

When you import `differenceWith` from `es-toolkit/compat`, it's fully compatible with lodash.

- `differenceWith` can accept multiple arrays to compare against the first array.
- `differenceWith` can accept array-like objects as arguments.
- `differenceWith` can omit the custom comparison function. When omitted, it uses the [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero) algorithm by default.

```typescript
import { differenceWith } from 'es-toolkit/compat';

// Example 1: Comparing with multiple arrays using a comparison function
const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
const values1 = [{ id: 2 }];
const values2 = [{ id: 3 }];
const comparator = (a, b) => a.id === b.id;

const result = differenceWith(array, values1, values2, comparator);
// The result is [{ id: 1 }]. This element remains in the first array based on the comparison criteria.

// Example 2: Using array-like objects with a comparison function
const array = { 0: { id: 1 }, 1: { id: 2 }, 2: { id: 3 }, length: 3 };
const values = { 0: { id: 2 }, 1: { id: 3 }, length: 2 };
const comparator = (a, b) => a.id === b.id;

const result2 = differenceWith(array, values, comparator);
// The result is [{ id: 1 }]. This element remains only in the first array-like object based on the comparison criteria.

// Example 3: Omitting the custom comparison function
const array = [1, 2, 3];
const values1 = [2];
const values2 = [3];

const result3 = differenceWith(array, values1, values2);
// The result is [1]. This element exists uniquely across all arrays.
```
