# dropRight

Removes a specified number of elements from the end of an array and returns the rest.

This function takes an array and a number, and returns a new array with the specified number 
of elements removed from the end.

## Signature

```typescript
function dropRight<T>(arr: T[], itemsCount: number): T[];
```

### Parameters

- `arr` (`T[]`): The array from which to drop elements.
- `itemsCount` (`number`): The number of elements to drop from the end of the array.

### Returns

(`T[]`) A new array with the specified number of elements removed from the end.


## Examples

```typescript
const array = [1, 2, 3, 4, 5];
const result = dropRight(array, 2);
// result will be [1, 2, 3] since the last two elements are dropped.
```
