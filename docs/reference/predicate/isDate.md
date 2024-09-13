# isDate

Check if the given value is a Date object.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to Date.

## Signature

```typescript
function isDate(value: unknown): value is Date;
```

### Parameters

- `value`(`unknown`): The value to test if it is a Date object.

### Returns

(`value is Date`): True if the value is a Date object, otherwise false.

## Examples

```typescript
const value1 = new Date();
const value2 = '2024-01-01';

console.log(isDate(value1)); // true
console.log(isDate(value2)); // false
```
