# at

Retrieves elements from an array at the specified indices.

This function supports negative indices, which count from the end of the array.

## Signature

```typescript
function at<T>(arr: T[], indices: number[]): Array<T | undefined>;
```

### Parameters

- `arr` (`T[]`): The array to retrieve elements from.
- `indices` (`number[]`): An array of indices specifying the positions of elements to retrieve.

### Returns

(`Array<T | undefined>`): A new array containing the elements at the specified indices.

## Examples

```typescript
import { at } from 'es-toolkit/array';

const numbers = [10, 20, 30, 40, 50];
const result = at(numbers, [1, 3, 4]);
console.log(result); // [20, 40, 50]
```
