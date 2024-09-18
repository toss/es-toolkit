# indexOf

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Finds the index of the first occurrence of a value in an array.

This method is similar to `Array.prototype.indexOf`, but it also finds `NaN` values.
It uses strict equality (`===`) to compare elements other than `NaN`.

## Signature

```typescript
function indexOf<T>(array: T[] | null | undefined, searchElement: T, fromIndex?: number): number;
```

### Parameters

- `array` (`T[] | null | undefined`): The array to search.
- `searchElement` (`T`): The value to search for.
- `fromIndex` (`number`, optional): The index to start the search at.

### Returns

(`number`): The index (zero-based) of the first occurrence of the value in the array, or `-1` if the value is not found.

## Example

```typescript
const array = [1, 2, 3, NaN];
indexOf(array, 3); // => 2
indexOf(array, NaN); // => 3
```
