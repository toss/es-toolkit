# isBoolean

Checks if a value is a boolean type.

```typescript
const result = isBoolean(value);
```

## Reference

### `isBoolean(value)`

Use `isBoolean` when you want to check if a value is exactly `true` or `false`. It acts as a type guard in TypeScript, narrowing the value's type to `boolean`.

```typescript
import { isBoolean } from 'es-toolkit/predicate';

// Checking basic boolean values
isBoolean(true); // true
isBoolean(false); // true

// Distinguishing from other types
isBoolean(1); // false
isBoolean(0); // false
isBoolean('true'); // false
isBoolean('false'); // false
```

Particularly useful when used as a type guard in TypeScript.

```typescript
import { isBoolean } from 'es-toolkit/predicate';

function processValue(value: unknown) {
  if (isBoolean(value)) {
    // value is narrowed to boolean
    console.log(value ? "It's true" : "It's false");
  } else {
    console.log('Not a boolean value');
  }
}
```

Can also be used for validating API responses or user input.

```typescript
import { isBoolean } from 'es-toolkit/predicate';

// Validating API response
interface APIResponse {
  success: unknown;
  data: any;
}

function validateResponse(response: APIResponse) {
  if (isBoolean(response.success)) {
    console.log(`API call ${response.success ? 'succeeded' : 'failed'}`);
    return response.success;
  }
  console.log('Invalid response format');
  return false;
}
```

#### Parameters

- `value` (`unknown`): The value to check if it's a boolean type.

#### Returns

(`value is boolean`): Returns `true` if the value is `true` or `false`, `false` otherwise.
