# isJSON

Checks if a given value is a valid JSON string. A valid JSON string is one that can be successfully parsed using `JSON.parse()`. This function can be used as a type guard in TypeScript, narrowing the type of the argument to `string`.

According to JSON specifications, string values like `null`, `true`, `false`, and numeric strings are considered valid JSON and will return true.

## Interface

```typescript
function isJSON(value: unknown): value is string;
```

### Parameters

- `value` (`unknown`): The value to check if it's a valid JSON string.

### Return Value

(`value is string`): Returns `true` if the value is a valid JSON string, otherwise `false`.

## Examples

```typescript
import { isJSON } from 'es-toolkit/predicate';

const value1 = '{"name":"John","age":30}';
const value2 = '[1,2,3]';
const value3 = 'true';
const value4 = 'null';
const value5 = '42';
const value6 = 'invalid json';
const value7 = { name: 'John' };
const value8 = null;

console.log(isJSON(value1)); // true
console.log(isJSON(value2)); // true
console.log(isJSON(value3)); // true (parsed as boolean per JSON spec)
console.log(isJSON(value4)); // true (parsed as null per JSON spec)
console.log(isJSON(value5)); // true (parsed as number per JSON spec)
console.log(isJSON(value6)); // false
console.log(isJSON(value7)); // false (not a string)
console.log(isJSON(value8)); // false (not a string)
```
