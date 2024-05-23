# chunk

Splits an array into smaller arrays of a specified length.

This function takes an input array and divides it into multiple smaller arrays,
each of a specified length. If the input array cannot be evenly divided,
the final sub-array will contain the remaining elements.


## Signature

```typescript
function chunk<T>(arr: T[], size: number): T[][];
```

## Examples

```typescript
// Splits an array of numbers into sub-arrays of length 2
chunk([1, 2, 3, 4, 5], 2);
// Returns: [[1, 2], [3, 4], [5]]

// Splits an array of strings into sub-arrays of length 3
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```