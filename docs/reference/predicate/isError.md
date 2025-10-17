# isError

Checks if a value is an `Error` object.

```typescript
const result = isError(value);
```

## Reference

### `isError(value)`

Use `isError` when you want to check if a value is an `Error` object. It can be used as a type guard in TypeScript to narrow the value's type to `Error`. Particularly useful in try-catch blocks or API response processing.

```typescript
import { isError } from 'es-toolkit/predicate';

// Checking Error objects
isError(new Error('Something went wrong')); // true
isError(new TypeError('Type error')); // true

// Distinguishing from other types
isError('error'); // false
isError({ name: 'Error', message: 'Custom error' }); // false
```

When used as a type guard in TypeScript, the value's type is narrowed.

```typescript
function handleError(value: unknown) {
  if (isError(value)) {
    // value is narrowed to Error
    console.log(`Error occurred: ${value.message}`);
    return value.name;
  }
  return 'Not an error';
}
```

#### Parameters

- `value` (`unknown`): The value to check if it's an `Error` object.

#### Returns

(`value is Error`): Returns `true` if the value is an `Error` object, `false` otherwise.
