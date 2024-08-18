# sampleSize

Returns a sample element array of a specified `size`.

This function takes an array and a number, and returns an array containing the sampled elements using [Floyd's algorithm](https://www.nowherenearithaca.com/2013/05/robert-floyds-tiny-and-beautiful.html).

## Signature

```typescript
export function sampleSize<T>(array: T[], size: number): T[];
```

### Parameters

- `array` (`T[]`): The array to sample from.
- `size` (`number`): The size of sample.

### Returns

(`T[]`): A new array with sample size applied.

### Throws

Throws an error if `size` is greater than the length of `array`.

## Examples

```typescript
const result = sampleSize([1, 2, 3], 2);
// result will be an array containing two of the elements from the array.
// [1, 2] or [1, 3] or [2, 3]
```
