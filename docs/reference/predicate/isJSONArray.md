# isJSONArray

Checks if a value is a valid JSON array.

```typescript
const result = isJSONArray(value);
```

## Reference

### `isJSONArray(value)`

Use `isJSONArray` when you want to check if all elements of an array are valid JSON values. A valid JSON array is an array consisting only of values that can be JSON-serialized (`null`, objects, arrays, strings, numbers, booleans).

```typescript
import { isJSONArray } from 'es-toolkit/predicate';

// Valid JSON arrays
console.log(isJSONArray([1, 2, 3])); // true
console.log(isJSONArray(['hello', 'world'])); // true
console.log(isJSONArray([true, false, null])); // true
console.log(isJSONArray([{ name: 'John' }, { name: 'Jane' }])); // true
console.log(
  isJSONArray([
    [1, 2],
    [3, 4],
  ])
); // true (nested arrays)
console.log(isJSONArray([])); // true (empty array)

// Complex valid JSON array
const complexArray = [42, 'text', true, null, { key: 'value' }, [1, 2, 3]];
console.log(isJSONArray(complexArray)); // true
```

Distinguishes from invalid JSON arrays:

```typescript
// Arrays containing functions - invalid
console.log(isJSONArray([1, 2, () => {}])); // false
console.log(isJSONArray([function () {}])); // false

// Arrays containing undefined - invalid
console.log(isJSONArray([1, undefined, 3])); // false

// Arrays containing Symbols - invalid
console.log(isJSONArray([Symbol('test')])); // false

// Arrays containing Date objects - invalid (must be converted to string in JSON)
console.log(isJSONArray([new Date()])); // false

// Non-array values
console.log(isJSONArray('not an array')); // false
console.log(isJSONArray({ 0: 'a', 1: 'b', length: 2 })); // false (array-like object)
console.log(isJSONArray(42)); // false
console.log(isJSONArray(null)); // false
```

Useful for API response validation or pre-serialization data verification.

```typescript
// API response validation
function processApiArray(data: unknown) {
  if (isJSONArray(data)) {
    // Can safely use JSON.stringify
    const jsonString = JSON.stringify(data);
    console.log('Serialized array:', jsonString);
    return data;
  }

  throw new Error('Not a valid JSON array');
}

// User input data validation
function validateUserList(input: unknown): any[] {
  if (isJSONArray(input)) {
    // TypeScript infers input as any[]
    return input;
  }

  return [];
}

// Configuration array validation
function loadArrayConfig(config: unknown) {
  if (isJSONArray(config)) {
    return {
      isValid: true,
      items: config,
      count: config.length,
    };
  }

  return {
    isValid: false,
    items: [],
    count: 0,
  };
}

// Works with nested structures
const nestedData = [{ users: [{ name: 'Alice' }, { name: 'Bob' }] }, { users: [{ name: 'Charlie' }] }];
console.log(isJSONArray(nestedData)); // true
```

Returns `false` for arrays with functions as elements or objects like `TypedArray` that cannot be JSON-serialized.

```typescript
// Regular array vs JSON array
const regularArray = [1, 2, function () {}]; // Valid as regular array
const jsonArray = [1, 2, 3]; // JSON-serializable array

console.log(Array.isArray(regularArray)); // true (regular array check)
console.log(isJSONArray(regularArray)); // false (JSON array check)

console.log(Array.isArray(jsonArray)); // true
console.log(isJSONArray(jsonArray)); // true

// TypedArray is not a JSON array
const typedArray = new Int32Array([1, 2, 3]);
console.log(Array.isArray(typedArray)); // false
console.log(isJSONArray(typedArray)); // false
```

#### Parameters

- `value` (`unknown`): The value to check if it's a valid JSON array.

#### Returns

(`value is any[]`): Returns `true` if the value is a valid JSON array, `false` otherwise.
