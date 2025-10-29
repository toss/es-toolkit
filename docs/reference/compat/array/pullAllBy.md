# pullAllBy (Lodash compatibility)

Removes specified values from the array based on values transformed by an iteratee.

```typescript
const modified = pullAllBy(array, valuesToRemove, iteratee);
```

## Reference

### `pullAllBy(array, values, iteratee)`

Removes specified values from the array based on values transformed through the provided iteratee function. The original array is modified and the modified array is returned.

```typescript
import { pullAllBy } from 'es-toolkit/compat';

// Remove by comparing property values
const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
pullAllBy(array, [{ x: 1 }, { x: 3 }], 'x');
console.log(array); // [{ x: 2 }]

// Compare by transforming values with a function
const numbers = [1, 2, 3, 4, 5];
pullAllBy(numbers, [2, 4], n => n % 2);
console.log(numbers); // [1, 3, 5] (only odd numbers remain)
```

If the array is empty, `null`, or `undefined`, it returns the original array as is.

```typescript
import { pullAllBy } from 'es-toolkit/compat';

pullAllBy([], [1, 2], x => x); // []
pullAllBy(null as any, [1, 2], x => x); // null
```

#### Parameters

- `array` (`T[]`): The array to modify.
- `values` (`ArrayLike<T>`, optional): The array of values to remove.
- `iteratee` (`ValueIteratee<T>`, optional): The iteratee function to apply to each element. You can use a property name, partial object, or function.

#### Returns

(`T[]`): Returns the original array with the specified values removed.
