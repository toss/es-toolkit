# reverse

Reverses the elements of an array in place.

This function reverses the array elements in place, directly modifying the original array. If the input is null or undefined, it returns the input as is.

## Signature

```typescript
function reverse<T>(array: T[] | null | undefined): T[] | null | undefined;
```

### Parameters

- - `array` (`T[] | null | undefined`): The array to reverse.

### Returns

(`T[] | null | undefined`): The reversed array, or null/undefined if the input was null/undefined.

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
