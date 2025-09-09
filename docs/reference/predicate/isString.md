# isString

Checks if the given value is a string.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `string`.

## Signature

```typescript
function isString(value: unknown): value is string;
```

### Parameters

- `value`(`unknown`): The value to test if it is string.

### Returns

(`value is string`): True if the value is a string, otherwise false.

## Examples

```typescript
const value1 = 'abc';
const value2 = 123;
const value3 = true;

console.log(isString(value1)); // true
console.log(isString(value2)); // false
console.log(isString(value3)); // false
```
