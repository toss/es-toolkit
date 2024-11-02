# slice

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Create a slice of `array` from `start` up to, but not including, `end`.

It does not return a dense array for sparse arrays unlike the native `Array.prototype.slice`.

## Signature

```typescript
function slice<T>(array: T[], start?: number, end?: number): T[];
```

### Parameters

- `array` (`T[]`): The array to slice.

::: info `array` can be `ArrayLike<T>`, `null`, or `undefined`

To ensure full compatibility with lodash, the `slice` function handles `array` in this way:

- If `array` is an `ArrayLike<T>`, it gets converted into an array using `Array.from(...)`.
- If `array` is `null` or `undefined`, it will be treated as an empty array.

:::

- `start` (`number`): The start position. Defaults to `0`.
- `end` (`number`): The end position. Defaults to `array.length`.

### Returns

(`T[]`): The slice of `array`.

## Examples

```typescript
slice([1, 2, 3], 1, 2); // => [2]
slice(new Array(3)); // => [undefined, undefined, undefined]
```
