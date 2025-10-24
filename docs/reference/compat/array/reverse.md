# reverse (Lodash Compatibility)

::: warning Use `Array.prototype.reverse()`

This `reverse` function includes `null` and `undefined` handling for Lodash compatibility. If you only need simple array reversal, the native JavaScript `Array.prototype.reverse()` method is more intuitive and faster.

Instead, use the faster and more modern `Array.prototype.reverse()`.

:::

Reverses array elements in place.

```typescript
const reversed = reverse(array);
```

## Reference

### `reverse(array)`

Reverses the order of the array so that the first element becomes the last and the last element becomes the first. It directly modifies the original array and returns the modified array.

```typescript
import { reverse } from 'es-toolkit/compat';

// Reverse a number array
const numbers = [1, 2, 3, 4, 5];
const reversed = reverse(numbers);
console.log(numbers); // => [5, 4, 3, 2, 1]
console.log(reversed); // => [5, 4, 3, 2, 1]

// Reverse a string array
const words = ['apple', 'banana', 'cherry'];
reverse(words);
console.log(words); // => ['cherry', 'banana', 'apple']

// Empty arrays or null/undefined are returned as is
reverse([]); // => []
reverse(null); // => null
reverse(undefined); // => undefined
```

Note that this function directly modifies the original array.

```typescript
import { reverse } from 'es-toolkit/compat';

const original = [1, 2, 3];
const result = reverse(original);

console.log(original === result); // => true (same array object)
console.log(original); // => [3, 2, 1] (original is modified)
```

#### Parameters

- `array` (`T[] | null | undefined`): The array to reverse. If `null` or `undefined`, it is returned as is.

#### Returns

(`T[] | null | undefined`): Returns the reversed array. If the input is `null` or `undefined`, that value is returned as is.
