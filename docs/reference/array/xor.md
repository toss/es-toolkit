# xor

Computes the symmetric difference between two arrays. The symmetric difference is the set of elements
which are in either of the arrays, but not in their intersection.

## Signature

```typescript
function xor<T>(arr1: T[], arr2: T[]): T[];
```

### Parameters

- `arr1` (`T[]`): The first array.
- `arr2` (`T[]`): The second array.

### Returns

(`T[]`): An array containing the elements that are present in either `arr1` or `arr2` but not in both.

## Examples

```typescript
// Returns [1, 2, 5, 6]
xor([1, 2, 3, 4], [3, 4, 5, 6]);

// Returns ['a', 'c']
xor(['a', 'b'], ['b', 'c']);
```
