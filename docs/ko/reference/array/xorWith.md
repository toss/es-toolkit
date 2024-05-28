# xorWith

Computes the symmetric difference between two arrays using a custom equality function. 
The symmetric difference is the set of elements which are in either of the arrays, 
but not in their intersection.

## Signature

```typescript
function xorWith<T>(arr1: T[], arr2: T[], areElementsEqual: (item1: T, item2: T) => boolean): T[];
```

### Parameters 

- `arr1` (`T[]`): The first array.
- `arr2` (`T[]`): The second array.
- `areElementsEqual` (`(item1: T, item2: T) => boolean`): The custom equality function to compare elements.

### Returns

(`T[]`): An array containing the elements that are present in either `arr1` or `arr2` but not in both, based on the custom equality function.

## Examples

```typescript
// Returns [{ id: 1 }, { id: 3 }]
xorWith([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id);
```
