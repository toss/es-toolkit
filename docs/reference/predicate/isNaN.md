# isNaN

Check if the given value is NaN.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to NaN.

## Signature

```typescript
function isNaN(value: unknown): value is typeof NaN;
```

### Parameters

- `value`(`unknown`): The value to test if it is NaN.

### Returns

(`value is typeof NaN`): True if the value is NaN, otherwise false.

## Examples

```typescript
const value1 = NaN;
const value2 = undefined;

console.log(isNaN(value1)); // true
console.log(isNaN(value2)); // false
```
