# isBigInt

Checks if the given value is a bigint.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `bigint`.

## Signature

```typescript
function isBigInt(x: unknown): x is bigint;
```

### Parameters

- `x` (`unknown`): The value to test if it is a bigint.

### Returns

(`x is bigint`): True if the value is a bigint, false otherwise.

## Examples

```typescript
const value1 = 0n;
const value2 = 0;
const value3 = '123';

console.log(isBigInt(value1)); // true
console.log(isBigInt(value2)); // false
console.log(isBigInt(value3)); // false
```
