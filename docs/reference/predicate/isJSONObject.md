# isJSONObject

Checks if a value is a JSON object.

A valid JSON object is defined as an object with string keys and valid [JSON values](./isJSONValue.md).

## Signature

```typescript
function isJSONObject(obj: unknown): obj is Record<string, any>;
```

### Parameters

- `value` (`unknown`): The value to check.

### Returns

(`obj is Record<string, any>`): True if the value is a JSON object, otherwise false.

## Examples

```typescript
console.log(isJSONObject({ nested: { boolean: true, array: [1, 2, 3], string: 'test', number: 1, null: null } })); // true
console.log(isJSONObject({})); // true
console.log(isJSONObject({ regexp: /test/ })); // false
console.log(isJSONObject(123)); // false
```
