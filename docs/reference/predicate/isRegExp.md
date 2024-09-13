# isRegExp

Check if the given value is a regular expression.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to `RegExp`.

## Signature

```typescript
function isRegExp(value: unknown): value is RegExp;
```

### Parameters

- `value`(`unknown`): The value to test if it is RegExp.

### Returns

(`value is RegExp`): True if the value is a RegExp, otherwise false.

## Examples

```typescript
const value1 = /abc/;
const value2 = '/abc/';

console.log(isRegExp(value1)); // true
console.log(isRegExp(value2)); // false
```
