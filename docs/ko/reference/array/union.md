# union

Creates an array of unique values from all given arrays.

This function takes two arrays, merges them into a single array, and returns a new array 
containing only the unique values from the merged array.

## Signature

```typescript
function union<T>(arr1: T[], arr2: T[]): T[];
```

### Parameters 

- `arr1` (`T[]`): The first array to merge and filter for unique values.
- `arr2` (`T[]`): The second array to merge and filter for unique values.

### Returns

(`T[]`): A new array of unique values.

## Examples

```typescript
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
const result = union(array1, array2);
// result will be [1, 2, 3, 4, 5]
```
