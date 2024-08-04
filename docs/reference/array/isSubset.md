# isSubset

Checks if the `subset` array is entirely contained within the `superset` array.

## Signature

```typescript
function isSubset<T>(superset: T[], subset: T[]): boolean;
```

### Parameters

- `superset` (`T[]`): The array that may contain all elements of the subset.
- `subset` (`D`): The array to check against the superset.

### Returns

(`boolean`): Returns `true` if all elements of the `subset` are present in the `superset`, otherwise returns `false`.

## Examples

```typescript
const superset1 = [1, 2, 3, 4, 5];
const subset1 = [2, 3, 4];

isSubset(superset1, subset1);
// Return true

const superset2 = ['a', 'b', 'c'];
const subset2 = ['a', 'd'];

isSubset(superset2, subset2);
// Return false
```
