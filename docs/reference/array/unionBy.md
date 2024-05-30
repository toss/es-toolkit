# unionBy

Creates an array of unique values, in order, from all given arrays using a provided mapping function to determine equality.

## Signature

```typescript
function unionBy<T, U>(arr1: T[], arr2: T[], mapper: (item: T) => U): T[]
```

### Parameters 

- `arr1` (`T[]`): The first array.
- `arr2` (`U[]`): The second array.
- `mapper`: (`(item: T) => U`): The function to map array elements to comparison values.

### Returns

(`T[]`): A new array containing the union of unique elements from `arr1` and `arr2`, based on the values returned by the mapping function.

## Examples

```typescript
unionBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], x => x.id);
// Returns [{ id: 1 }, { id: 2 }, { id: 3 }]
```
