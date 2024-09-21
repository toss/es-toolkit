# isJSONString

Checks if a value is a JSON string.

True if the value is a JSON string (either an object or an array), false otherwise.

## Signature

```typescript
function isJSONString(value: unknown): boolean;
```

### Parameters

- `value` (`unknown`): The value to check.

### Returns

(`boolean`): True if the value is a JSON string, otherwise false.

## Examples

```typescript
console.log(isJSONString('{"name": "John", "age": 30}')); // true
console.log(isJSONString('[1, 2, 3]')); // true
console.log(isJSONString({ name: 'John', age: 30 })); // false
console.log(isJSONString(null)); // false
console.log(isJSONString('123')); // false
```
