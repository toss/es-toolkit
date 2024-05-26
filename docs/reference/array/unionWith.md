# unionWith

Creates an array of unique values from two given arrays based on a custom equality function.

This function takes two arrays and a custom equality function, merges the arrays, and returns 
a new array containing only the unique values as determined by the custom equality function.

## Signature

```typescript
function unionWith<T>(arr1: T[], arr2: T[], areItemsEqual: (item1: T, item2: T) => boolean): T[];
```

### Parameters 

- `arr1` (`T[]`): The first array to merge and filter for unique values.
- `arr2` (`T[]`): The second array to merge and filter for unique values.
- `areItemsEqual` (`(item1: T, item2: T) => boolean`): A custom function to determine if two elements are equal. It takes two arguments and returns `true` if the elements are considered equal, and `false` otherwise.

### Returns

(`T[]`): A new array of unique values based on the custom equality function.

## Examples

```typescript
const array1 = [{ id: 1 }, { id: 2 }];
const array2 = [{ id: 2 }, { id: 3 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = unionWith(array1, array2, areItemsEqual);
// result will be [{ id: 1 }, { id: 2 }, { id: 3 }] since { id: 2 } is considered equal in both arrays
```