# indexOf (Lodash Compatibility)

::: warning Use `Array.prototype.indexOf` or `Array.prototype.findIndex`

This `indexOf` function operates slowly due to additional logic for handling `NaN`.

If you're not looking for `NaN`, use the faster `Array.prototype.indexOf`. To find `NaN`, use `Array.prototype.findIndex` with `Number.isNaN`.

:::

Finds the index of the first occurrence of a given element in an array.

Works almost the same as `Array.prototype.indexOf`, but can find `NaN` values.
Uses strict equality (`===`) when comparing elements other than `NaN`.

## Interface

```typescript
function indexOf<T>(array: T[], searchElement: T, fromIndex?: number): number;
```

### Parameters

- `array` (`T[]`): The array to search.

::: info `array` can be `ArrayLike<T>`, `null`, or `undefined`

To ensure full compatibility with lodash, the `indexOf` function handles `array` as follows:

- If `array` is `ArrayLike<T>`, it uses `Array.from(...)` to convert it to an array.
- If `array` is `null` or `undefined`, it's treated as an empty array.

:::

- `searchElement` (`T`): The value to find.
- `fromIndex` (`number`, optional): The index to start searching from.

#### Returns

(`number`): The index of the first element in the array that matches the given value. Returns `-1` if no matching element is found.

## Examples

```typescript
const array = [1, 2, 3, NaN];
indexOf(array, 3); // => 2
indexOf(array, NaN); // => 3
```
