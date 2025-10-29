# invariant

Asserts that a given condition is true. If the condition is false, it throws an error.

```typescript
invariant(condition, message);
```

## Reference

### `invariant(condition, message)`

Use `invariant` when a specific condition must be satisfied in your code. If the condition is false, it immediately throws an error to stop program execution.

```typescript
import { invariant } from 'es-toolkit/util';

// If the condition is true, nothing happens
invariant(true, 'This message will not appear');

// If the condition is false, it throws an error
invariant(false, 'This condition is false'); // Error: This condition is false

// When checking that a value is not null or undefined
const value = getValue();
invariant(value !== null && value !== undefined, 'Value must not be null or undefined');
// Now you can be sure that value is neither null nor undefined

// When checking if a number is positive
const number = getNumber();
invariant(number > 0, 'Number must be positive');
```

You can also pass an error object directly.

```typescript
import { invariant } from 'es-toolkit/util';

// Passing an Error object
invariant(false, new Error('Custom error message'));

// Using a custom error class
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

invariant(false, new ValidationError('Validation failed'));
```

It is particularly useful for validating code assumptions during development or ensuring that function inputs are within expected ranges.

#### Parameters

- `condition` (`unknown`): The condition to evaluate. If it evaluates to a falsy value, an error is thrown.
- `message` (`string | Error`): The error message or error object to throw when the condition is false.

#### Returns

(`void`): Returns nothing if the condition is true.

#### Errors

Throws the provided message or error object if the condition evaluates to false.
