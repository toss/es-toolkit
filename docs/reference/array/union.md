# union

Creates an array of unique values from all given arrays.

This function takes multiple arrays, merges them into a single array, and returns a new array 
containing only the unique values from the merged array.

## Signature

```typescript
function union<T>(...arrays: T[][]): T[];
```

### Parameters 

- `...arrays` (`T[][]`): The arrays to merge and filter for unique values.

### Returns

(`T[]`): A new array of unique values.

## Examples

```typescript
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
const result = union(array1, array2);
// result will be [1, 2, 3, 4, 5]
```
