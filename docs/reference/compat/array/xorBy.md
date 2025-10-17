# xorBy (Lodash Compatibility)

::: warning Use [xorBy](../../array/xorBy.md) from `es-toolkit`

This `xorBy` function operates slowly due to handling of `null` or `undefined`, complex duplicate calculation logic, etc.

Instead, use the faster and more modern [xorBy](../../array/xorBy.md) from `es-toolkit`.

:::

Creates a new array of elements that exist in exactly one of the multiple arrays based on a transformation function.

```typescript
const result = xorBy(...arrays, iteratee);
```

## Reference

### `xorBy(...arrays, iteratee)`

Computes the symmetric difference of multiple arrays based on a transformation function. Returns elements whose transformation result exists in exactly one of the arrays. This is useful when comparing based on a specific property in object arrays or based on a specific calculation result in number arrays.

```typescript
import { xorBy } from 'es-toolkit/compat';

// Compute symmetric difference by Math.floor result
xorBy([2.1, 1.2], [4.3, 2.4], Math.floor);
// Returns: [1.2, 4.3]

// Compute symmetric difference by object property
xorBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], 'x');
// Returns: [{ x: 2 }]

// Compute symmetric difference with function
const users1 = [{ name: 'John', age: 30 }];
const users2 = [
  { name: 'Jane', age: 25 },
  { name: 'John', age: 30 },
];
xorBy(users1, users2, user => user.name);
// Returns: [{ name: 'Jane', age: 25 }]

// Symmetric difference of three arrays
xorBy([1.2, 2.3], [3.4, 4.5], [5.6, 6.7], Math.floor);
// Returns: [1.2, 3.4, 5.6]
```

`null` or `undefined` are ignored.

```typescript
import { xorBy } from 'es-toolkit/compat';

xorBy([2.1, 1.2], null, [4.3, 2.4], Math.floor);
// Returns: [1.2, 4.3]
```

#### Parameters

- `...arrays` (`Array<ArrayLike<T> | null | undefined | ValueIteratee<T>>`): The arrays to compute the symmetric difference from and the transformation function at the end. Can be a function, property name, partial object, etc.

#### Returns

(`T[]`): Returns a new array of elements that exist in exactly one of the arrays based on the transformation function result.
