# isPrimitive

Checks if a given value is a JavaScript primitive.

```typescript
const result = isPrimitive(value);
```

## Usage

### `isPrimitive(value)`

Use `isPrimitive` when you want to check if a value is a JavaScript primitive. JavaScript primitives include `null`, `undefined`, strings, numbers, booleans, symbols, and `BigInt`. It's useful for distinguishing from reference types like objects or functions.

```typescript
import { isPrimitive } from 'es-toolkit/predicate';

// Primitive values
console.log(isPrimitive(null)); // true
console.log(isPrimitive(undefined)); // true
console.log(isPrimitive('hello')); // true
console.log(isPrimitive(42)); // true
console.log(isPrimitive(true)); // true
console.log(isPrimitive(false)); // true
console.log(isPrimitive(Symbol('test'))); // true
console.log(isPrimitive(123n)); // true

// Reference types (not primitives)
console.log(isPrimitive({})); // false
console.log(isPrimitive([])); // false
console.log(isPrimitive(new Date())); // false
console.log(isPrimitive(new Map())); // false
console.log(isPrimitive(new Set())); // false
console.log(isPrimitive(() => {})); // false
console.log(isPrimitive(/regex/)); // false
```

It's useful when implementing deep copy logic.

```typescript
// Handle primitives and objects differently
function deepClone(value: any): any {
  if (isPrimitive(value)) {
    // Return primitives as-is
    return value;
  }

  // Perform cloning logic for objects
  if (Array.isArray(value)) {
    return value.map(deepClone);
  }

  const result: any = {};
  for (const key in value) {
    result[key] = deepClone(value[key]);
  }
  return result;
}

// Use in value comparison
function isEqual(a: unknown, b: unknown): boolean {
  if (isPrimitive(a) && isPrimitive(b)) {
    return a === b;
  }

  // Complex object comparison logic...
  return false;
}

// Safe string conversion for logging
function safeLog(value: unknown) {
  if (isPrimitive(value)) {
    console.log('Primitive value:', value);
  } else {
    console.log('Object:', typeof value, Object.prototype.toString.call(value));
  }
}
```

You can use it as a type guard to write safe code.

```typescript
function processValue(input: unknown) {
  if (isPrimitive(input)) {
    // TypeScript infers input as a primitive type
    console.log('Type of primitive:', typeof input);
    console.log('Primitive value:', input);
    return input;
  }

  // Here input is inferred as an object type
  console.log('It is an object type');
  return null;
}

// API response validation
function validateApiResponse(data: unknown) {
  if (isPrimitive(data)) {
    return {
      type: 'primitive',
      value: data,
      serializable: true,
    };
  }

  return {
    type: 'object',
    value: data,
    serializable: false, // Needs additional validation
  };
}

// Configuration value processing
function normalizeConfigValue(value: unknown) {
  if (isPrimitive(value)) {
    // Primitives can be safely converted to strings
    return String(value);
  }

  // Serialize objects as JSON
  try {
    return JSON.stringify(value);
  } catch {
    return '[Complex Object]';
  }
}
```

You can distinguish wrapper objects like `String`, `Number`, `Boolean` from primitive values.

```typescript
// Wrapper objects are not primitives
console.log(isPrimitive(new String('hello'))); // false
console.log(isPrimitive(new Number(42))); // false
console.log(isPrimitive(new Boolean(true))); // false

// But actual primitives are true
console.log(isPrimitive('hello')); // true
console.log(isPrimitive(42)); // true
console.log(isPrimitive(true)); // true

// You can extract primitive values with valueOf()
const strObj = new String('hello');
console.log(isPrimitive(strObj.valueOf())); // true
```

#### Parameters

- `value` (`unknown`): The value to check if it's a JavaScript primitive.

#### Returns

(`boolean`): Returns `true` if the value is a primitive, `false` otherwise.
