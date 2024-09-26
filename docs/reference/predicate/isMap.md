# isMap

Checks if the given value is a `Map`.

This function tests whether the provided value is an instance of `Map`.
It returns `true` if the value is a `Map`, and `false` otherwise.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `Map`.

## Signature

```typescript
function isMap(value: unknown): value is Map<any, any>;
```

### Parameters

- `value` (`unknown`): The value to check if it is a `Map`.

### Returns

(`value is Map<any, any>`): true if the value is a `Map`, false otherwise.

## Examples

```typescript
const value1 = new Map();
const value2 = new Set();
const value3 = new WeakMap();

console.log(isMap(value1)); // true
console.log(isMap(value2)); // false
console.log(isMap(value3)); // false
```
