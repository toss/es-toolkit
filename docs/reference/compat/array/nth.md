# nth

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Gets the element at index `n` of `array`. If `n` is negative, the nth element from the end is returned.

## Signature

```typescript
function nth<T>(array: ArrayLike<T> | null | undefined, n: number): T | undefined;
```

### Parameters

- `array` (`ArrayLike<T> | null | undefined`): The array to query.
- `n` (`number`): The index of the element to return.

### Returns

(`T | undefined`): Returns the nth element of `array`.

## Examples

```typescript
nth([1, 2, 3], 1); // => 2
nth([1, 2, 3], -1); // => 3
```