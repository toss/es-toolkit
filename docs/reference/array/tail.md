# tail

Returns a new array with all elements except for the first.

This function takes an array and returns a new array containing all the elements except for the first one. If the input array is empty or has only one element, an empty array is returned.

## Signature

```typescript
function tail<T>(arr: readonly [T]): [];
function tail(arr: readonly []): [];
function tail<T, U>(arr: readonly [T, ...U[]]): U[];
function tail<T>(arr: readonly T[]): T[];
```

### Parameters

- `arr` (`readonly T[]`): The array to get the tail of.

### Returns

(`T[]`): A new array containing all elements of the input array except for the first one.

## Examples

```typescript
const arr1 = [1, 2, 3];
const result = tail(arr1);
// result will be [2, 3]

const arr2 = [1];
const result2 = tail(arr2);
// result2 will be []

const arr3 = [];
const result3 = tail(arr3);
// result3 will be []
```
