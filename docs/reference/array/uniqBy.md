# uniqBy

Returns a new array with duplicate elements removed based on values returned by the transformation function.

```typescript
const uniqueArray = uniqBy(arr, mapper);
```

## Reference

### `uniqBy(arr, mapper)`

Use `uniqBy` when you want to transform elements by a specific criterion and determine duplicates. It only keeps the first occurrence among elements for which the transformation function returns the same value.

```typescript
import { uniqBy } from 'es-toolkit/array';

// Remove duplicates by converting decimal numbers downward.
const numbers = [1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19];
const result = uniqBy(numbers, Math.floor);
console.log(result); // [1.2, 2.1, 3.2, 5.7, 7.19]

// Remove duplicates from an object array based on a specific property.
const users = [
  { id: 1, name: 'john', age: 30 },
  { id: 2, name: 'jane', age: 30 },
  { id: 3, name: 'joe', age: 25 },
  { id: 4, name: 'jenny', age: 25 },
];
const uniqueByAge = uniqBy(users, user => user.age);
console.log(uniqueByAge);
// [{ id: 1, name: 'john', age: 30 }, { id: 3, name: 'joe', age: 25 }]

// Remove duplicates based on string length.
const words = ['apple', 'pie', 'banana', 'cat', 'dog'];
const uniqueByLength = uniqBy(words, word => word.length);
console.log(uniqueByLength); // ['apple', 'pie', 'cat']
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

// Remove duplicates based on category.
const uniqueByCategory = uniqBy(products, item => item.category);
console.log(uniqueByCategory.length); // 2
console.log(uniqueByCategory);
// [{ category: 'fruit', name: 'apple' }, { category: 'vegetable', name: 'carrot' }]
```

#### Parameters

- `arr` (`readonly T[]`): The array from which to remove duplicates.
- `mapper` (`(item: T) => U`): A function that transforms each element into a value for comparison.

#### Returns

(`T[]`): A new array with duplicates removed based on the transformation function's results. Preserves the order in which they first appear in the original array.
