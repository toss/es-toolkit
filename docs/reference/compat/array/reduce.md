# reduce (Lodash Compatibility)

::: warning Use `Array.prototype.reduce` or `Object.values` with `reduce`

This `reduce` function operates slowly due to complex type handling and support for various input formats.

Instead, use the faster and more modern `Array.prototype.reduce` method, or for objects, use it together with `Object.values`.

:::

Reduces an array or object to a single value.

```typescript
const result = reduce(collection, iteratee, initialValue);
```

## Reference

### `reduce(collection, iteratee, initialValue)`

Iterates through all elements of an array or object to calculate an accumulated value. If an initial value is provided, it starts with that value; otherwise, it starts with the first element.

```typescript
import { reduce } from 'es-toolkit/compat';

// Calculate sum of array
const numbers = [1, 2, 3, 4];
const sum = reduce(numbers, (acc, value) => acc + value, 0);
console.log(sum); // 10

// Calculate sum of object values
const scores = { math: 95, english: 87, science: 92 };
const totalScore = reduce(scores, (acc, value) => acc + value, 0);
console.log(totalScore); // 274
```

If no initial value is provided, the first element becomes the initial value and iteration starts from the second element.

```typescript
import { reduce } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4];
const sum = reduce(numbers, (acc, value) => acc + value);
console.log(sum); // 10 (1 + 2 + 3 + 4)

// Empty array returns undefined
const empty = [];
const result = reduce(empty, (acc, value) => acc + value);
console.log(result); // undefined
```

#### Parameters

- `collection` (`T[] | ArrayLike<T> | Record<string, T> | null | undefined`): The array or object to iterate over.
- `iteratee` (`(accumulator: any, value: any, index: PropertyKey, collection: any) => any`): The function to call for each element. It receives the accumulated value, current value, index/key, and the original array/object.
- `initialValue` (`any`, optional): The initial value for the accumulator. If not provided, the first element becomes the initial value.

#### Returns

(`any`): Returns the final accumulated value after processing all elements.
