# unzip

Gathers elements in the same position in an internal array from a grouped array of elements and returns them as a new array.

## Signature

```typescript
type Unzip<K extends unknown[]> = { [I in keyof K]: Array<K[I]> };
function unzip<T extends unknown[]>(zipped: Array<[...T]>): Unzip<T>;

```typescript
unzip([
  ['a', true, 1],
  ['b', false, 2],
]);
// return: [['a', 'b'], [true, false], [1, 2]]
```
