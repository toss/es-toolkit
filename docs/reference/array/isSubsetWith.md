# isSubsetWith

Checks if the `subset` array is entirely contained within the `superset` array.

This function takes two arrays and a comparison function as arguments. The comparison function is used to determine whether the elements are equal. The function returns `true` if all elements of the subset exist in the superset, and `false` otherwise.

## Signature

```typescript
function isSubsetWith<T>(superset: T[], subset: T[], areItemsEqual: (x: T, y: T) => boolean): boolean;
```

### Parameters

- `superset` (`T[]`): The array that may contain all elements of the subset.
- `subset` (`T[]`): The array to check against the superset.
- `areItemsEqual` (`(x: T, y: T) => boolean`): A function to determine if two items are equal.

### Returns

(`boolean`): Returns `true` if all elements of the `subset` are present in the `superset`, otherwise returns `false`.

## Examples

```typescript
const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
const subset = [{ id: 2 }, { id: 1 }];
const areItemsEqual = (a, b) => a.id === b.id;

isSubsetWith(superset, subset, areItemsEqual);
// Return true

const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
const subset = [{ id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;

isSubsetWith(superset, subset, areItemsEqual);
// Return false
```
