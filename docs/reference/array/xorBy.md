# xorBy

Computes the symmetric difference between two arrays using a custom mapping function. 
The symmetric difference is the set of elements which are in either of the arrays, 
but not in their intersection, determined by the result of the mapping function.

## Signature

```typescript
function xorBy<T, U>(arr1: T[], arr2: T[], mapper: (item: T) => U): T[];
```

### Parameters 

- `arr1` (`T[]`): The first array.
- `arr2` (`T[]`): The second array.
- `mapper` (`(item: T) => U`): The function to map array elements to comparison values.

### Returns

(`T[]`): An array containing the elements that are present in either `arr1` or `arr2` but not in both, based on the values returned by the mapping function.

## Examples

```typescript
// Returns [{ id: 1 }, { id: 3 }]
xorBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
```
