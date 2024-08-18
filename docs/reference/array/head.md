# head

Returns the first element of an array.

This function takes an array and returns the first element of the array. If the array is empty, the function returns `undefined`.

## Signature

```typescript
export function head<T>(arr: [T, ...T[]]): T;
export function head<T>(arr: T[]): T | undefined;
```

### Parameters

- `arr` (`T[]`): The array from which to get the first element.

### Returns

(`T | undefined`): The first element of the array, or `undefined` if the array is empty.

## Examples

```typescript
const arr1 = [1, 2, 3];
const firstElement1 = head(arr1);
// firstElement1 will be 1

const arr2: string[] = [];
const firstElement2 = head(arr2);
// firstElement2 will be undefined

const arr3 = ['a', 'b', 'c'];
const firstElement3 = head(arr3);
// firstElement3 will be 'a'

const arr4 = [true, false, true];
const firstElement4 = head(arr4);
// firstElement4 will be true

const arr5: [number, string, boolean] = [1, 'a', true];
const firstElement5 = head(arr5);
// firstElement5 will be 1
```
