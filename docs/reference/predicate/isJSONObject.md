# isJSONObject

Checks if a value is a valid JSON object.

The keys of a JSON object are strings, and the values can be strings, numbers, booleans, null, plain objects, or arrays.

## Signature

```typescript
function isJSONObject(value: unknown): boolean;
```

### Parameters

- `value` (`unknown`): The value to check.

### Returns

(`boolean`): True if the value is a JSON object, otherwise false.

## Examples

```typescript
console.log(isJSONObject({ nested: { boolean: true, array: [1, 2, 3], string: 'test', number: 1, null: null } })); // true
console.log(isJSONObject({})); // true
console.log(isJSONObject({ regexp: /test/ })); // false
console.log(isJSONObject(123)); // false
```
