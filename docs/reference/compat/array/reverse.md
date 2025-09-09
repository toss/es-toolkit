# reverse

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Reverses the elements of an array in place.

This function reverses the array elements in place, directly modifying the original array. If the input is null or undefined, it returns the input as is.

## Signature

```typescript
function reverse<T>(array: T[]): T[];
```

### Parameters

- `array` (`T[]`): The array to reverse.

### Returns

(`T[]`): The reversed array.

## Examples

```typescript
const array = [1, 2, 3, 4, 5];
const reversedArray = reverse(array);
console.log(reversedArray); // [5, 4, 3, 2, 1]
console.log(array); // [5, 4, 3, 2, 1] (The original array is modified)

const emptyArray = reverse([]);
console.log(emptyArray); // []

const nullArray = reverse(null);
console.log(nullArray); // null
```
