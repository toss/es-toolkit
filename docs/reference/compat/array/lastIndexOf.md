# lastIndexOf (Lodash compatibility)

::: warning Use `Array.lastIndexOf`

This `lastIndexOf` function operates slowly due to handling `null` or `undefined`, searching for `NaN` values, etc.

Instead, use the faster and more modern `Array.lastIndexOf`.

:::

Finds the last index at which a given element appears in an array.

```typescript
const index = lastIndexOf(array, searchElement, fromIndex);
```

## Usage

### `lastIndexOf(array, searchElement, fromIndex)`

Returns the last index at which a given element appears in an array. Similar to native `Array.lastIndexOf` but can also find `NaN` values.

```typescript
import { lastIndexOf } from 'es-toolkit/compat';

// Basic usage
lastIndexOf([1, 2, 1, 2], 2);
// => 3

// Specifying a start index
lastIndexOf([1, 2, 1, 2], 2, 2);
// => 1

// Finding NaN values (native lastIndexOf cannot find NaN)
lastIndexOf([1, 2, NaN, 4, NaN], NaN);
// => 4

// Using negative index
lastIndexOf([1, 2, 3, 4], 3, -2);
// => 2
```

`null` or `undefined` are treated as empty arrays.

```typescript
import { lastIndexOf } from 'es-toolkit/compat';

lastIndexOf(null, 1); // -1
lastIndexOf(undefined, 1); // -1
```

#### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to search.
- `searchElement` (`T`): The element to find.
- `fromIndex` (`true | number`, optional): The index to start searching from. Passing `true` searches from the end of the array. Defaults to `array.length - 1`.

#### Returns

(`number`): Returns the index of the last matching element. Returns `-1` if not found.
