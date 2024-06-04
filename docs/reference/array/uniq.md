===

# uniq

Creates a duplicate-free version of an array.

This function takes an array and returns a new array containing only the unique values
from the original array, preserving the order of first occurrence.

## Signature

```typescript
function uniq<T>(arr: T[]): T[];
```

### Parameters

- `arr` (`T[]`): The array to process.

### Returns

(`T[]`): A new array with only unique values from the original array.

## Examples

```typescript
const array = [1, 2, 2, 3, 4, 4, 5];
const result = uniq(array);
// result will be [1, 2, 3, 4, 5]
```
