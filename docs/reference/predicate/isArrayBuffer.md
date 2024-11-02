# isArrayBuffer

Checks if the given value is a `ArrayBuffer`.

This function tests whether the provided value is an instance of `ArrayBuffer`.
It returns `true` if the value is a `ArrayBuffer`, and `false` otherwise.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `ArrayBuffer`.

## Signature

```typescript
function isArrayBuffer(value: unknown): value is ArrayBuffer;
```

### Parameters

- `value` (`unknown`): The value to check if it is a `ArrayBuffer`.

### Returns

(`value is ArrayBuffer`): true if the value is a `ArrayBuffer`, false otherwise.

## Examples

```typescript
const value1 = new ArrayBuffer();
const value2 = new Array();
const value3 = new Map();

console.log(isArrayBuffer(value1)); // true
console.log(isArrayBuffer(value2)); // false
console.log(isArrayBuffer(value3)); // false
```
