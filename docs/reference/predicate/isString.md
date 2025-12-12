# isString

Checks if a given value is a string.

```typescript
const result = isString(value);
```

## Usage

### `isString(value)`

Use `isString` when you want to check if a value is a string. It's useful for distinguishing string types from other primitive types or objects.

```typescript
import { isString } from 'es-toolkit/predicate';

// String values
console.log(isString('hello')); // true
console.log(isString('')); // true
console.log(isString('123')); // true
console.log(isString('true')); // true

// Non-string values
console.log(isString(123)); // false
console.log(isString(true)); // false
console.log(isString(null)); // false
console.log(isString(undefined)); // false
console.log(isString([])); // false
console.log(isString({})); // false
console.log(isString(new String('hello'))); // false (String object)
```

Useful for data validation and type-safe string processing:

```typescript
// Safe string manipulation
function processText(input: unknown): string {
  if (isString(input)) {
    // TypeScript infers input as string
    return input.trim().toLowerCase();
  }

  // Convert other types to string
  return String(input);
}

// Usage examples
console.log(processText('  HELLO  ')); // 'hello'
console.log(processText(123)); // '123'
console.log(processText(true)); // 'true'
console.log(processText(null)); // 'null'

// Form data validation
function validateForm(data: Record<string, unknown>) {
  const errors: string[] = [];

  if (!isString(data.name) || data.name.length === 0) {
    errors.push('Name is required');
  }

  if (!isString(data.email) || !data.email.includes('@')) {
    errors.push('Please enter a valid email');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Usage examples
console.log(validateForm({ name: 'John', email: 'john@example.com' }));
// { isValid: true, errors: [] }

console.log(validateForm({ name: 123, email: 'invalid-email' }));
// { isValid: false, errors: ['Name is required', 'Please enter a valid email'] }
```

#### Parameters

- `value` (`unknown`): The value to check if it's a string.

#### Returns

(`value is string`): Returns `true` if the value is a string, `false` otherwise.
