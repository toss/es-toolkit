# intersectionBy (Lodash Compatibility)

::: warning Use [`intersectionBy`](../../array/intersectionBy.md) from `es-toolkit`

This `intersectionBy` function operates slowly due to complex condition processing, multiple array support, property path parsing, etc.

Instead, use the faster and more modern [`intersectionBy`](../../array/intersectionBy.md) from `es-toolkit`.

:::

Finds the intersection of multiple arrays using a given condition function.

```typescript
const result = intersectionBy(...arrays, iteratee);
```

## Reference

### `intersectionBy(...arrays, iteratee)`

Finds the intersection of multiple arrays based on values transformed by a given condition function. The condition can be provided in various forms such as a function, property name, partial object, etc.

```typescript
import { intersectionBy } from 'es-toolkit/compat';

// Intersection by function
const array1 = [2.1, 1.2];
const array2 = [2.3, 3.4];
const result = intersectionBy(array1, array2, Math.floor);
// result is [2.1] (2 is common based on Math.floor)

// Intersection by property
const users1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const users2 = [
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
const byId = intersectionBy(users1, users2, 'id');
// byId is [{ id: 2, name: 'jane' }]

// Intersection of three arrays
const array3 = [2.5, 4.1];
const multiResult = intersectionBy(array1, array2, array3, Math.floor);
// multiResult is [2.1]

// Array-like objects
const arrayLike1 = { 0: { x: 1 }, 1: { x: 2 }, length: 2 };
const arrayLike2 = { 0: { x: 2 }, 1: { x: 3 }, length: 2 };
const byProperty = intersectionBy(arrayLike1, arrayLike2, 'x');
// byProperty is [{ x: 2 }]
```

`null` or `undefined` arrays are treated as empty arrays.

```typescript
import { intersectionBy } from 'es-toolkit/compat';

const array1 = [{ x: 1 }, { x: 2 }];
const result = intersectionBy(array1, null, 'x');
// result is []
```

You can also specify conditions with partial objects or property-value pairs.

```typescript
import { intersectionBy } from 'es-toolkit/compat';

const products1 = [
  { category: 'fruit', name: 'apple' },
  { category: 'vegetable', name: 'carrot' },
];
const products2 = [
  { category: 'fruit', name: 'banana' },
  { category: 'meat', name: 'beef' },
];

// Specify condition with partial object
const byCategory = intersectionBy(products1, products2, { category: 'fruit' });
// Specify condition with property-value pair
const byCategoryPair = intersectionBy(products1, products2, ['category', 'fruit']);
```

#### Parameters

- `...arrays` (`Array<ArrayLike<T> | null | undefined>`): The arrays to find the intersection of.
- `iteratee` (`Function | PropertyKey | Array | Object`): The condition to transform each element. Can be a function, property name, property-value pair, or partial object.

#### Returns

(`T[]`): Returns a new array of elements that exist in all arrays based on the transformed values.
