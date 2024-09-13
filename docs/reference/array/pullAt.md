# pullAt

Removes elements from an array at specified indices and returns the removed elements.

This function supports negative indices, which count from the end of the array.

## Signature

```typescript
function pullAt<T>(arr: T[], indicesToRemove: number[]): Array<T | undefined>;
```

### Parameters

- `arr` (`T[]`): The array from which elements will be removed.
- `indicesToRemove` (`number[]`): An array of indices specifying the positions of elements to remove.

### Returns

(`Array<T | undefined>`): An array containing the elements that were removed from the original array.

## Examples

```typescript
import { pullAt } from 'es-toolkit/array';

const numbers = [10, 20, 30, 40, 50];
const removed = pullAt(numbers, [1, 3, 4]);
console.log(removed); // [20, 40, 50]
console.log(numbers); // [10, 30]
```
