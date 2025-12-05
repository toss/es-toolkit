# uniqBy

Returns a new array with duplicate elements removed based on either:

- values returned by the selector function, or
- the value of a given property key.

```typescript
const uniqueArray = uniqBy(arr, selector);
```

## Usage

### `uniqBy(arr, selector)`

Use `uniqBy` when you want to determine duplicates by a specific criterion.
It only keeps the first occurrence among elements for which the selector returns the same value.

The selector can be:

- a function that transforms each element into a comparison value, or
- a property key of the elements (e.g. 'id', 'age').

```typescript
import { uniqBy } from 'es-toolkit/array';

// Remove duplicates by converting decimal numbers downward.
const numbers = [1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19];
const result = uniqBy(numbers, Math.floor);
console.log(result); // [1.2, 2.1, 3.2, 5.7, 7.19]

// Remove duplicates from an object array based on a specific property using a selector function.
const users = [
  { id: 1, name: 'john', age: 30 },
  { id: 2, name: 'jane', age: 30 },
  { id: 3, name: 'joe', age: 25 },
  { id: 4, name: 'jenny', age: 25 },
];
const uniqueByAge = uniqBy(users, user => user.age);
console.log(uniqueByAge);
// [{ id: 1, name: 'john', age: 30 }, { id: 3, name: 'joe', age: 25 }]

// The same but using a property key.
const uniqueByAgeKey = uniqBy(users, 'age');
console.log(uniqueByAgeKey);
// [{ id: 1, name: 'john', age: 30 }, { id: 3, name: 'joe', age: 25 }]

// Remove duplicates based on string length.
const words = ['apple', 'pie', 'banana', 'cat', 'dog'];
const uniqueByLength = uniqBy(words, word => word.length);
console.log(uniqueByLength); // ['apple', 'pie', 'banana']
```

You can also base it on a combination of specific fields in complex objects.

```typescript
import { uniqBy } from 'es-toolkit/array';

const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
  { category: 'fruit', name: 'grape' },
];

// Remove duplicates based on category using a selector function.
const uniqueByCategory = uniqBy(products, item => item.category);
console.log(uniqueByCategory.length); // 2
console.log(uniqueByCategory);
// [{ category: 'fruit', name: 'apple' }, { category: 'vegetable', name: 'carrot' }]

// Or using a property key directly.
const uniqueByCategoryKey = uniqBy(products, 'category');
console.log(uniqueByCategoryKey.length); // 2
console.log(uniqueByCategoryKey);
// [{ category: 'fruit', name: 'apple' }, { category: 'vegetable', name: 'carrot' }]
```

#### Parameters

- `arr` (`readonly T[]`): The array from which to remove duplicates.
- `selector` (`((item: T) => U) | keyof T`):
  - A function that selects a value for comparison, or
  - a property key of `T` used to determine uniqueness.

#### Returns

(`T[]`): A new array with duplicates removed based on the selector’s result.  
It preserves the order in which elements first appear in the original array.
