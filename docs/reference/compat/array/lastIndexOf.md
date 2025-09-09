# lastIndexOf

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Finds the index of the last occurrence of a value in an array.

This method is similar to `Array.prototype.lastIndexOf`, but it also finds `NaN` values.
It uses strict equality (`===`) to compare elements other than `NaN`.

## Signature

```typescript
function lastIndexOf<T>(array: T[], searchElement: T, fromIndex?: number): number;
```

### Parameters

- `array` (`T[]`): The array to search.

::: info `array` can be `ArrayLike<T>` or `null` or `undefined`

To ensure full compatibility with lodash, the `lastIndexOf` function processes `array` as follows:

- If `array` is `ArrayLike<T>`, it converts it to an array using `Array.from(...)`.
- If `array` is `null` or `undefined`, it is treated as an empty array.

:::

- `searchElement` (`T`): The value to search for.
- `fromIndex` (`number`, optional): The index to start the search at.

### Returns

(`number`): The index (zero-based) of the last occurrence of the value in the array, or `-1` if the value is not found.

## Example

```typescript
const array = [1, 2, 3, NaN, 1];
lastIndexOf(array, 1); // => 4
lastIndexOf(array, NaN); // => 3
```
