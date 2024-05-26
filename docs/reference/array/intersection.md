# intersection

Returns the intersection of two arrays.

This function takes two arrays and returns a new array containing the elements that are 
present in both arrays. It effectively filters out any elements from the first array that 
are not found in the second array.


## Signature

```typescript
function intersection<T>(firstArr: T[], secondArr: T[]): T[];
```

### Parameters 

- `firstArr` (`T[]`): The first array to compare.
- `secondArr` (`T[]`): The second array to compare.

### Returns

(`T[]`) A new array containing the elements that are present in both arrays.


## Examples

```typescript
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const result = intersection(array1, array2);
// result will be [3, 4, 5] since these elements are in both arrays.
```
