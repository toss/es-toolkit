# uniqWith

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

This method is like `uniq`, except that it accepts a `comparator` which is used to determine the equality of elements.

It creates a duplicate-free version of an array, in which only the first occurrence of each element is kept.
If a `comparator` is provided, it will be invoked with two arguments: `(arrVal, othVal)` to compare elements.
If no comparator is provided, shallow equality is used.

The order of result values is determined by the order they appear in the input array.

## Signature

```typescript
function uniqWith<T>(arr: ArrayLike<T> | null | undefined, comparator?: Comparator<T>): T[];
```

### Parameters

- `arr` (`ArrayLike<T> | null | undefined`): The array to process.
- `comparator` (`Comparator<T>`): Optional function to compare elements for equality.

### Returns

(`T[]`): A new array with only unique values based on the comparator.

## Examples

```typescript
const array = [1, 2, 2, 3];
const result = uniqWith(array);
// result will be [1, 2, 3]

const array = [1, 2, 3];
const result = uniqWith(array, (a, b) => a % 2 === b % 2)
// result will be [1, 2]
```