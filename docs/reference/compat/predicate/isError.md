# isError (Lodash Compatibility)

::: warning Use `es-toolkit`'s [isError](../../predicate/isError.md) instead
This `isError` function operates slowly due to complex handling for Lodash compatibility.

Use the faster and more modern `es-toolkit`'s [isError](../../predicate/isError.md) instead.
:::

Checks if a value is an Error object.

```typescript
const result = isError(value);
```

## Usage

### `isError(value)`

Use `isError` when you want to type-safely check if a value is an Error object. It also works as a type guard in TypeScript.

```typescript
import { isError } from 'es-toolkit/compat';

// Error object checking
isError(new Error()); // true
isError(new TypeError('Type error')); // true
isError(new ReferenceError('Reference error')); // true

// Custom errors that inherit from Error
class CustomError extends Error {}
isError(new CustomError()); // true

// Other types return false
isError('Error'); // false
isError({ name: 'Error', message: 'Something went wrong' }); // false
isError({}); // false
isError(null); // false
isError(undefined); // false
```

#### Parameters

- `value` (`unknown`): The value to check if it's an Error object.

#### Returns

(`boolean`): Returns `true` if the value is an Error object, `false` otherwise.
