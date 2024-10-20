# median

Calculates the median of an array of numbers.

The median is the middle value of a sorted array. 
If the array has an odd number of elements, the median is the middle value. 
If the array has an even number of elements, it returns the average of the two middle values.

If the array is empty, this function returns `NaN`.

## Signature

```typescript
function median(nums: readonly number[]): number;
```

### Parameters

- `nums` (`readonly number[]`): An array of numbers to calculate the median.

### Returns

(`number`): The median of all the numbers in the array.

## Examples

```typescript
const arrayWithOddNumberOfElements = [1, 2, 3, 4, 5];
const result = median(arrayWithOddNumberOfElements);
// result will be 3

const arrayWithEvenNumberOfElements = [1, 2, 3, 4];
const result = median(arrayWithEvenNumberOfElements);
// result will be 2.5
```
