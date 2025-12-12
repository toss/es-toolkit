# indexOf (Lodash Compatibility)

::: warning Use `Array.prototype.indexOf` or `Array.prototype.findIndex`

This `indexOf` function operates slowly due to additional logic for handling `NaN`.

If you're not looking for `NaN`, use the faster `Array.prototype.indexOf`. To find `NaN`, use `Array.prototype.findIndex` with `Number.isNaN`.

:::

Finds the index of the first occurrence of a given element in an array.

```typescript
const index = indexOf(array, searchElement, fromIndex);
```

## Usage

### `indexOf(array, searchElement, fromIndex?)`

Works almost the same as `Array.prototype.indexOf`, but can find `NaN` values. Use this when you need to find the position of a specific value in an array.

```typescript
import { indexOf } from 'es-toolkit/compat';

// Find element in number array
const array = [1, 2, 3, 4];
indexOf(array, 3); // => 2

// Find NaN value (Array.prototype.indexOf cannot find it)
const arrayWithNaN = [1, 2, NaN, 4];
indexOf(arrayWithNaN, NaN); // => 2
```

You can start searching from a specific index.

```typescript
import { indexOf } from 'es-toolkit/compat';

const array = [1, 2, 3, 1, 2, 3];
indexOf(array, 2, 2); // => 4 (start searching from index 2)
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { indexOf } from 'es-toolkit/compat';

indexOf(null, 1); // => -1
indexOf(undefined, 1); // => -1
```

#### Parameters

- `array` (`T[]`): The array to search.

::: info `array` can be `ArrayLike<T>`, `null`, or `undefined`

To ensure full compatibility with lodash, the `indexOf` function handles `array` as follows:

- If `array` is `ArrayLike<T>`, it uses `Array.from(...)` to convert it to an array.
- If `array` is `null` or `undefined`, it's treated as an empty array.

:::

- `searchElement` (`T`): The value to find.
- `fromIndex` (`number`, optional): The index to start searching from. If negative, it's calculated from the end of the array. Defaults to `0`.

#### Returns

(`number`): Returns the index of the first element in the array that matches the given value. Returns `-1` if no matching element is found.
