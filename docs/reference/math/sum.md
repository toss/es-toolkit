# sum

Calculates the sum of an array of numbers.

This function takes an array of numbers and returns the sum of all the elements in the array.

If the array is empty, this function returns `0`.

If the array contains `bigint` values, the function returns a `bigint` value.

## Signature

```typescript
function sum(nums: number[]): number;
function sum(nums: bigint[]): bigint;
```

### Parameters

- `nums` (`number[] | bigint[]`): An array of numbers to be summed.

### Returns

(`number | bigint`): The sum of all the numbers in the array.

## Examples

```typescript
sum([1, 2, 3, 4, 5]); // 15
sum([1n, 2n, 3n, 4n, 5n]); // 15n
sum([]); // 0
```
