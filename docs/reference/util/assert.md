# assert

Asserts that a given condition is true. If the condition is false, an error is thrown with the provided message or error.

This function is an alias for the [invariant](./invariant.md) function.

## Signature

```typescript
function assert(condition: unknown, message: string): asserts condition;
function assert(condition: unknown, error: Error): asserts condition;
```

### Parameters

- `condition` (`unknown`): The condition to evaluate.
- `message` (`string` | `Error`): The error message to throw if the condition is false.

### Returns

(`void`): Returns void if the condition is true.

### Throws

Throws an error with the specified message if the condition evaluates to false.

## Examples

```typescript
// This call will succeed without any errors
assert(true, 'This should not throw');

// This call will fail and throw an error with the message 'This should throw'
assert(false, 'This should throw');

// Example of using assert with a condition
assert(condition, 'Expected condition is false');

// Ensure that the value is neither null nor undefined
assert(value !== null && value !== undefined, 'Value should not be null or undefined');

// Example of using assert to check if a number is positive
assert(number > 0, 'Number must be positive');

// Example of using assert with an error
assert(false, new Error('This should throw'));

// Example of using assert with a custom error
class CustomError extends Error {
  constructor(message: string) {
    super(message);
  }
}

assert(false, new CustomError('This should throw'));
```
