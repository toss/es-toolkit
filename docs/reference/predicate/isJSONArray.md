# isJSONArray

Checks if a given value is a valid JSON array.

A valid JSON array is defined as an array where all items are [valid JSON values](./isJSONValue.md).

## Signature

```typescript
function isJSONArray(value: unknown): value is any[];
```

### Parameters

- `value` (`unknown`): The value to check.

### Returns

(`value is any[]`): True if the value is a valid JSON array, otherwise false.

## Examples

```typescript
console.log(isJSONArray([1, 2, 3])); // true
console.log(isJSONArray(['string', null, true])); // true
console.log(isJSONArray([1, 2, () => {}])); // false
console.log(isJSONArray('not an array')); // false
```
