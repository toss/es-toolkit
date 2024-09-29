# isJSONValue

Checks if a given value is a valid JSON value.

A valid JSON value can be:

- [a JSON object](./isJSONObject.md) (an object with string keys and valid JSON values)
- [a JSON array](./isJSONArray.md) (an array of valid JSON values)
- a `string`
- a `number`
- a `boolean`
- `null`

## Signature

```typescript
function isJSONValue(value: unknown): value is Record<string, any> | any[] | string | number | boolean | null;
```

### Parameters

- `value` (`unknown`): The value to check.

### Returns

(`value is Record<string, any> | any[] | string | number | boolean | null`): True if the value is a valid JSON value, otherwise false.

## Examples

```typescript
console.log(isJSONValue(null)); // true
console.log(isJSONValue({ key: 'value' })); // true
console.log(isJSONValue([1, 2, 3])); // true
console.log(isJSONValue('Hello')); // true
console.log(isJSONValue(42)); // true
console.log(isJSONValue(true)); // true
console.log(isJSONValue(undefined)); // false
console.log(isJSONValue(() => {})); // false
```
