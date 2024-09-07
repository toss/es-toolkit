# isWeakMap

Checks if the given value is a `WeakMap`.

This function tests whether the provided value is an instance of `WeakMap`.
It returns `true` if the value is a `WeakMap`, and `false` otherwise.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `WeakMap`.

## Signature

```typescript
function isWeakMap(value: unknown): value is WeakMap<WeakKey, any>;
```

### Parameters

`value` (`unknown`): The value to test if it is a `WeakMap`.

### Returns

(`value is WeakMap<WeakKey, any>`): true if the value is a `WeakMap`, false otherwise.

## Examples

```typescript
const value1 = new WeakMap();
const value2 = new Map();
const value3 = new Set();

console.log(isWeakMap(value1)); // true
console.log(isWeakMap(value2)); // false
console.log(isWeakMap(value3)); // false
```
