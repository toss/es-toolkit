# reduceRight (Lodash Compatibility)

::: warning Use `Array.prototype.reduceRight` or `Object.values` with `reduceRight`

This `reduceRight` function operates slowly due to complex type handling and support for various input formats.

Instead, use the faster and more modern `Array.prototype.reduceRight` method, or for objects, use `reduceRight` together with `Object.values`.

:::

Reduces an array or object to a single value by iterating from right to left.

```typescript
const result = reduceRight(collection, iteratee, initialValue);
```

## Usage

### `reduceRight(collection, iteratee, initialValue)`

Iterates through all elements of an array or object from right to left to calculate an accumulated value. If an initial value is provided, it starts with that value; otherwise, it starts with the last element.

```typescript
import { reduceRight } from 'es-toolkit/compat';

// Concatenate array to string (from right)
const letters = ['a', 'b', 'c', 'd'];
const result = reduceRight(letters, (acc, value) => acc + value, '');
console.log(result); // 'dcba'

// Multiply object values (reverse of key order)
const numbers = { x: 2, y: 3, z: 4 };
const product = reduceRight(numbers, (acc, value) => acc * value, 1);
console.log(product); // 24 (1 * 4 * 3 * 2)
```

If no initial value is provided, the last element becomes the initial value and iteration starts from the second to last element.

```typescript
import { reduceRight } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4];
const sum = reduceRight(numbers, (acc, value) => acc + value);
console.log(sum); // 10 (4 + 3 + 2 + 1)

// Empty array returns undefined
const empty = [];
const result = reduceRight(empty, (acc, value) => acc + value);
console.log(result); // undefined
```

#### Parameters

- `collection` (`T[] | ArrayLike<T> | Record<string, T> | null | undefined`): The array or object to iterate over.
- `iteratee` (`(accumulator: any, value: any, index: PropertyKey, collection: any) => any`): The function to call for each element. It receives the accumulated value, current value, index/key, and the original array/object.
- `initialValue` (`any`, optional): The initial value for the accumulator. If not provided, the last element becomes the initial value.

#### Returns

(`any`): Returns the final accumulated value after processing all elements.
