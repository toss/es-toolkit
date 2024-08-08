# isBoolean

Checks if the given value is a boolean.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `boolean`.

## Signature

```typescript
function isBoolean(x: unknown): x is boolean;
```

### Parameters

- `x` (`unknown`): The value to test if it is boolean.

### Returns

(`x is boolean`): True if the value is boolean, false otherwise.

## Examples

```typescript
const value1 = true;
const value2 = 0;
const value3 = 'abc';

console.log(isBoolean(value1)); // true
console.log(isBoolean(value2)); // false
console.log(isBoolean(value3)); // false
```
