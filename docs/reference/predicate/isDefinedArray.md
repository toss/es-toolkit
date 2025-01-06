# isDefinedArray

Checks whether all elements in the given array are neither `undefined` nor `null`.

You can use it as a TypeScript type guard, narrowing the type of the array from `T | undefined | null` to `T`.

## Signature

```typescript
function isDefinedArray<T>(array: Array<T | undefined | null>): array is T[];
```

### Parameters

- `array` (`Array<T | undefined | null>`): The array to check if all elements are defined.

### Returns

(`array is T[]`): `true` if all elements are defined; otherwise, `false`.

## Examples

```typescript
// All elements are defined, so it returns true.
console.log(isDefinedArray([1, 2, 3])); // true

// If there's an undefined or null element, it returns false.
console.log(isDefinedArray([undefined, 1, 2, 3])); // false
console.log(isDefinedArray([null, 1, 2, 3])); // false

// An empty array is considered to have all elements defined, so it returns true.
console.log(isDefinedArray([])); // true
```
