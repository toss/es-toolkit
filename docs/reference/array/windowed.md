# windowed

Creates an array of sub-arrays (windows) from the input array, each of the specified size.
The windows can overlap depending on the step size provided.

By default, only full windows are included in the result, and any leftover elements that can't form a full window are ignored.

If the `partialWindows` option is set to true in the options object, the function will also include partial windows at the end of the result.
Partial windows are smaller sub-arrays created when there aren't enough elements left in the input array to form a full window.

## Signature

```typescript
function windowed<T>(arr: T[], size: number, step: number, { partialWindows = false }: WindowedOptions): T[][];

interface WindowedOptions {
  partialWindows?: boolean;
}
```

### Parameters

- `arr` (`readonly T[]`): The input array to create windows from.
- `size` (`number`): The size of each window. Must be a positive integer.
- `step` (`number`): The step size between the start of each window. Must be a positive integer.
- `options.partialWindows` (`boolean`): Whether to include partial windows at the end of the array.

### Returns

(`T[][]`): An array of windows (sub-arrays) created from the input array.

## Examples

```typescript
windowed([1, 2, 3, 4], 2);
// => [[1, 2], [2, 3], [3, 4]]

windowed([1, 2, 3, 4, 5, 6], 3, 2);
// => [[1, 2, 3], [3, 4, 5]]

windowed([1, 2, 3, 4, 5, 6], 3, 2, { partialWindows: true });
// => [[1, 2, 3], [3, 4, 5], [5, 6]]
```
