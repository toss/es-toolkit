# invariant

Asserts that a given condition is true. If the condition is false, an error is thrown with the provided message.

## Signature

```typescript
function invariant(condition: unknown, message: string): asserts condition;
```

### Parameters

- `condition` (`unknown`): The condition to evaluate.
- `message` (`string`): The error message to throw if the condition is false.

### Returns

(`void`): Returns void if the condition is true.

### Throws

Throws an error with the specified message if the condition evaluates to false.

## Examples

```typescript
// This call will succeed without any errors
invariant(true, 'This should not throw');

// This call will fail and throw an error with the message 'This should throw'
invariant(false, 'This should throw');

// Example of using invariant with a condition
invariant(condition, 'Expected condition is false');

// Ensure that the value is neither null nor undefined
invariant(value !== null && value !== undefined, 'Value should not be null or undefined');

// Example of using invariant to check if a number is positive
invariant(number > 0, 'Number must be positive');
```
