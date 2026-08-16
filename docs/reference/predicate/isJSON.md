# isJSON

Checks if a value is a valid JSON string.

```typescript
const result = isJSON(value);
```

## Usage

### `isJSON(value)`

Use `isJSON` when you want to check if a string is a valid JSON format. This function verifies if it can be parsed with `JSON.parse()`. According to JSON specifications, strings representing objects, arrays, strings, numbers, booleans, and `null` are all valid.

```typescript
import { isJSON } from 'es-toolkit/predicate';

// Valid JSON strings
console.log(isJSON('{"name":"John","age":30}')); // true
console.log(isJSON('[1,2,3]')); // true
console.log(isJSON('"hello world"')); // true
console.log(isJSON('42')); // true
console.log(isJSON('true')); // true
console.log(isJSON('false')); // true
console.log(isJSON('null')); // true

// Invalid JSON strings
console.log(isJSON('undefined')); // false
console.log(isJSON('function() {}')); // false
console.log(isJSON('{name: "John"}')); // false (keys without quotes)
console.log(isJSON("{'name': 'John'}")); // false (single quotes)
console.log(isJSON('{}')); // true (empty object is valid)
console.log(isJSON('[]')); // true (empty array is valid)
```

All non-string values return `false`:

```typescript
// Non-string values
console.log(isJSON({ name: 'John' })); // false
console.log(isJSON([1, 2, 3])); // false
console.log(isJSON(42)); // false
console.log(isJSON(true)); // false
console.log(isJSON(null)); // false
console.log(isJSON(undefined)); // false
```

Useful for API response or user input validation:

```typescript
// API response validation
function processApiResponse(response: unknown) {
  if (isJSON(response)) {
    try {
      const data = JSON.parse(response);
      console.log('Parsed data:', data);
      return data;
    } catch (error) {
      // Won't execute here since isJSON returned true
      console.error('Parsing failed:', error);
    }
  }

  console.log('Not a valid JSON string');
  return null;
}

// User input validation
function validateJsonInput(input: unknown): string | null {
  if (isJSON(input)) {
    // TypeScript infers input as string
    return input;
  }

  throw new Error('Input must be a valid JSON string');
}

// Configuration file validation
function loadConfig(configString: unknown) {
  if (isJSON(configString)) {
    const config = JSON.parse(configString);
    return {
      isValid: true,
      config,
      error: null,
    };
  }

  return {
    isValid: false,
    config: null,
    error: 'Invalid JSON format',
  };
}
```

Accurately detects complex JSON structures:

```typescript
const complexJson = `{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "preferences": {
        "theme": "dark",
        "notifications": true
      }
    }
  ],
  "meta": {
    "total": 1,
    "page": 1
  }
}`;

console.log(isJSON(complexJson)); // true

// Invalid formats
console.log(isJSON('{ "name": "John", }')); // false (trailing comma)
console.log(isJSON('{ name: "John" }')); // false (unquoted key)
console.log(isJSON("{ 'name': 'John' }")); // false (single quotes)
```

#### Parameters

- `value` (`unknown`): The value to check if it's a valid JSON string.

#### Returns

(`value is string`): Returns `true` if the value is a valid JSON string, `false` otherwise.
