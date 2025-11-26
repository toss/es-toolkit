# isJSONValue

Checks if a value is a valid JSON value.

```typescript
const result = isJSONValue(value);
```

## Usage

### `isJSONValue(value)`

Use `isJSONValue` when you want to check if a value can be JSON-serialized. According to JSON specifications, valid values are `null`, objects, arrays, strings, numbers, and booleans. This function is the foundation for other JSON-related type guards.

```typescript
import { isJSONValue } from 'es-toolkit/predicate';

// Primitive JSON values
console.log(isJSONValue(null)); // true
console.log(isJSONValue('hello')); // true
console.log(isJSONValue(42)); // true
console.log(isJSONValue(true)); // true
console.log(isJSONValue(false)); // true

// Objects and arrays (all internal values must also be valid)
console.log(isJSONValue({ name: 'John', age: 30 })); // true
console.log(isJSONValue([1, 2, 3, 'text'])); // true
console.log(isJSONValue([])); // true (empty array)
console.log(isJSONValue({})); // true (empty object)

// Nested structures
const complexData = {
  user: {
    name: 'Alice',
    active: true,
    scores: [95, 87, 92],
  },
  metadata: null,
};
console.log(isJSONValue(complexData)); // true
```

Accurately distinguishes values that cannot be JSON-serialized. Functions, `undefined`, `Symbol`, class instances, etc. are not supported by JSON specifications and return `false`:

```typescript
// undefined is not supported in JSON
console.log(isJSONValue(undefined)); // false

// Functions cannot be JSON-serialized
console.log(isJSONValue(() => {})); // false
console.log(isJSONValue(function () {})); // false

// Symbol is not supported in JSON
console.log(isJSONValue(Symbol('test'))); // false

// Date objects must be converted to strings in JSON
console.log(isJSONValue(new Date())); // false

// RegExp objects are not supported in JSON
console.log(isJSONValue(/pattern/)); // false

// Objects/arrays containing functions or undefined
console.log(isJSONValue({ name: 'John', greet: () => {} })); // false
console.log(isJSONValue([1, 2, undefined])); // false

// BigInt is not supported in JSON
console.log(isJSONValue(BigInt(123))); // false
```

Useful for data validation before JSON serialization:

```typescript
// Safe JSON serialization
function safeJsonStringify(data: unknown): string | null {
  if (isJSONValue(data)) {
    // Data is guaranteed to be a valid JSON value
    return JSON.stringify(data);
  }

  console.warn('Data is not JSON-serializable');
  return null;
}

// API request data validation
function sendApiRequest(data: unknown) {
  if (isJSONValue(data)) {
    const jsonPayload = JSON.stringify(data);
    // Send API request
    console.log('Data to send:', jsonPayload);
    return fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonPayload,
    });
  }

  throw new Error('API data must be JSON-serializable');
}

// localStorage validation before saving
function saveToStorage(key: string, value: unknown) {
  if (isJSONValue(value)) {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  console.error('Cannot save non-JSON-serializable data type to localStorage');
  return false;
}

// Configuration file validation
function validateConfig(config: unknown) {
  if (isJSONValue(config)) {
    return {
      isValid: true,
      config,
      serialized: JSON.stringify(config),
    };
  }

  return {
    isValid: false,
    config: null,
    error: 'Config must be a valid JSON value',
  };
}
```

Can be combined with other type guards.

```typescript
// Specific JSON type checking
function processJsonData(data: unknown) {
  if (!isJSONValue(data)) {
    throw new Error('Invalid JSON value');
  }

  // Now data is guaranteed to be a valid JSON value
  if (isJSONObject(data)) {
    console.log('Is a JSON object:', Object.keys(data));
  } else if (isJSONArray(data)) {
    console.log('Is a JSON array:', data.length, 'items');
  } else {
    console.log('Is a primitive JSON value:', typeof data, data);
  }
}

// Nested data validation
const testData = {
  valid: { name: 'test', values: [1, 2, 3] },
  invalid: { name: 'test', callback: () => {} },
};

console.log(isJSONValue(testData.valid)); // true
console.log(isJSONValue(testData.invalid)); // false
```

Edge cases:

```typescript
// Special number values
console.log(isJSONValue(Infinity)); // false (converted to null in JSON)
console.log(isJSONValue(-Infinity)); // false
console.log(isJSONValue(NaN)); // false (converted to null in JSON)

// Empty values
console.log(isJSONValue('')); // true (empty string)
console.log(isJSONValue(0)); // true
console.log(isJSONValue(false)); // true

// Objects with prototypes
const obj = Object.create({ inherited: 'value' });
obj.own = 'property';
console.log(isJSONValue(obj)); // true (treated as plain object)
```

#### Parameters

- `value` (`unknown`): The value to check if it's a valid JSON value.

#### Returns

(`boolean`): Returns `true` if the value is a valid JSON value, `false` otherwise.
