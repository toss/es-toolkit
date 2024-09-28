# isSet

Checks if the given value is a `Set`.

This function tests whether the provided value is an instance of `Set`.
It returns `true` if the value is a `Set`, and `false` otherwise.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `Set`.

## Signature

```typescript
function isSet(value: unknown): value is Set<any>;
```

### Parameters

- `value` (`unknown`): The value to check if it is a `Set`.

### Returns

(`value is Set<any>`): true if the value is a `Set`, false otherwise.

## Examples

```typescript
const value1 = new Set();
const value2 = new Map();
const value3 = new WeakSet();

console.log(isSet(value1)); // true
console.log(isSet(value2)); // false
console.log(isSet(value3)); // false
```
