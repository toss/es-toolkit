# first

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns the first element of an array or `undefined` if the array is empty.

This function takes an array and returns the first element of the array.
If the array is empty, the function returns `undefined`.

## Signature

```typescript
function first<T>(arr: ArrayLike<T> | undefined | null): T | undefined;
```

### Parameters

- `arr` (`ArrayLike<T> | undefined | null`): The array from which to get the first element.

### Returns

(`T | undefined`): The first element of the array, or `undefined` if the array is empty.

## Examples

```typescript
const arr1 = [1, 2, 3];
const firstElement1 = first(arr1);
// firstElement1 will be 1

const arr2: string[] = [];
const firstElement2 = first(arr2);
// firstElement2 will be undefined

const arr3 = ['a', 'b', 'c'];
const firstElement3 = first(arr3);
// firstElement3 will be 'a'

const arr4 = [true, false, true];
const firstElement4 = first(arr4);
// firstElement4 will be true

const arr5: [number, string, boolean] = [1, 'a', true];
const firstElement5 = first(arr5);
// firstElement5 will be 1
```
