# isJSONObject

Checks if a value is a valid JSON object.

```typescript
const result = isJSONObject(value);
```

## Usage

### `isJSONObject(value)`

Use `isJSONObject` when you want to check if an object has string keys and all values are valid JSON values. A valid JSON object is a plain object consisting only of string keys and JSON-serializable values (`null`, objects, arrays, strings, numbers, booleans).

```typescript
import { isJSONObject } from 'es-toolkit/predicate';

// Valid JSON objects
console.log(isJSONObject({ name: 'John', age: 30 })); // true
console.log(isJSONObject({ active: true, score: null })); // true
console.log(isJSONObject({})); // true (empty object)

// Validates nested structures
const nested = {
  user: {
    name: 'Alice',
    preferences: {
      theme: 'dark',
      notifications: true,
    },
  },
  data: [1, 2, 3],
  timestamp: null,
};
console.log(isJSONObject(nested)); // true

// Complex valid JSON object
const complex = {
  id: 42,
  title: 'Example',
  published: true,
  tags: ['javascript', 'tutorial'],
  author: {
    name: 'Developer',
    email: 'dev@example.com',
  },
  metadata: null,
};
console.log(isJSONObject(complex)); // true
```

Accurately distinguishes invalid JSON objects containing non-JSON-serializable values like functions, `Symbol`, `Date` objects, `undefined`, or class instances.

```typescript
// Objects containing functions - invalid
console.log(isJSONObject({ name: 'John', greet: () => {} })); // false
console.log(isJSONObject({ method: function () {} })); // false

// Objects containing undefined - invalid
console.log(isJSONObject({ name: 'John', age: undefined })); // false

// Objects with Symbol keys or values - invalid
console.log(isJSONObject({ [Symbol('key')]: 'value' })); // false
console.log(isJSONObject({ name: Symbol('name') })); // false

// Objects like Date, RegExp - invalid
console.log(isJSONObject({ created: new Date() })); // false
console.log(isJSONObject({ pattern: /test/ })); // false

// Class instances - invalid
class Person {
  constructor(public name: string) {}
}
console.log(isJSONObject(new Person('John'))); // false

// Non-object values
console.log(isJSONObject('not an object')); // false
console.log(isJSONObject(42)); // false
console.log(isJSONObject([1, 2, 3])); // false
console.log(isJSONObject(null)); // false
```

Can be used to validate safe usage of `JSON.stringify`.

```typescript
// API response validation
function processApiResponse(data: unknown) {
  if (isJSONObject(data)) {
    // Can safely use JSON.stringify
    const jsonString = JSON.stringify(data);
    console.log('Serialized object:', jsonString);

    // TypeScript infers data as Record<string, any>
    return data;
  }

  throw new Error('Not a valid JSON object');
}

// Configuration object validation
function loadConfig(config: unknown) {
  if (isJSONObject(config)) {
    return {
      isValid: true,
      config,
      keys: Object.keys(config),
    };
  }

  return {
    isValid: false,
    config: {},
    keys: [],
  };
}

// User input data validation
function validateUserData(input: unknown): Record<string, any> {
  if (isJSONObject(input)) {
    // All properties are guaranteed to be JSON-serializable
    return input;
  }

  throw new Error('User data must be a valid JSON object');
}

// Nested object validation
function validateNestedConfig(data: unknown) {
  if (isJSONObject(data)) {
    // All nested objects and arrays are also guaranteed to be JSON-valid
    console.log('Configuration is fully JSON-compatible');
    return data;
  }

  return null;
}
```

`isJSONObject` has a different purpose than other object checking functions. `isPlainObject` checks if it's a plain object, while `isJSONObject` checks if it's an object that can be JSON-serialized.

```typescript
import { isPlainObject } from 'es-toolkit/predicate';

const objectWithFunction = {
  name: 'John',
  greet: function () {
    return 'Hello';
  },
};

const plainJsonObject = {
  name: 'John',
  age: 30,
};

// Plain object vs JSON object
console.log(isPlainObject(objectWithFunction)); // true (plain object)
console.log(isJSONObject(objectWithFunction)); // false (not JSON object due to function)

console.log(isPlainObject(plainJsonObject)); // true
console.log(isJSONObject(plainJsonObject)); // true

// Built-in objects
console.log(isPlainObject(new Date())); // false
console.log(isJSONObject(new Date())); // false

// Arrays
console.log(isPlainObject([])); // false
console.log(isJSONObject([])); // false (arrays are JSON values but not JSON "objects")
```

#### Parameters

- `value` (`unknown`): The value to check if it's a valid JSON object.

#### Returns

(`boolean`): Returns `true` if the value is a valid JSON object, `false` otherwise.
