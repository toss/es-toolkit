# isNumber

Checks if the given value is a number.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `number`.

## Signature

```typescript
function isNumber(value: unknown): value is number;
```

### Parameters

- `value` (`unknown`): The value to test if it is number.

### Returns

(`value is number`): True if the value is a number, otherwise false.

## Examples

```typescript
const value1 = 123;
const value2 = 'abc';
const value3 = true;

console.log(isNumber(value1)); // true
console.log(isNumber(value2)); // false
console.log(isNumber(value3)); // false
```
