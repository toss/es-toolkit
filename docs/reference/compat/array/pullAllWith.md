# pullAllWith

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Removes and returns elements from an array using a provided comparison function to determine which elements to remove.

It compares elements of the original `array` with elements of the comparison array (`values`) using the comparison function (`comparator`), and removes elements from the original array for which the comparison returns `true`.

## Interface

```typescript
function pullAllWith<T>(array: T[], values: T[], comparator: (a: T, b: T) => boolean): T[];
```

### Parameters

- `array` (`T[]`): The array to modify.
- `values` (`T[]`): The values to remove from the array.
- `comparator` (`(a: T, b: T) => boolean`): The function to compare elements of `array` with elements of `values`. Should return `true` if the two elements are considered equal.

### Return Value

(`T[]`): The array with specified values removed.

## Example

```typescript
import { pullAllWith } from 'es-toolkit/array';

const array = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 },
];

const removed = pullAllWith(array, [{ x: 3, y: 4 }], (a, b) => JSON.stringify(a) === JSON.stringify(b));

console.log(removed); // [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
console.log(array); // [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
```
