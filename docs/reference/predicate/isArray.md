# isArray

Checks if the given value is an array.

This function tests whether the provided value is an array or not.
It returns `true` if the value is an array, and `false` otherwise.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to an array.

## Signature

```typescript
function isArray<T>(value: T): value is Extract<T, unknown[] | Readonly<unknown[]>>;
```

### Parameters

- `value` (`T`): The value to test if it is an array.

### Returns

(`value is Extract<T, unknown[] | Readonly<unknown[]>>`): `true` if the value is an array, `false` otherwise.

## Examples

```typescript
const value1 = [1, 2, 3];
const value2 = 'abc';
const value3 = () => {};

console.log(isArray(value1)); // true
console.log(isArray(value2)); // false
console.log(isArray(value3)); // false
```
