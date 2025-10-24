# assert

Asserts that a given condition is true. If the condition is false, it throws an error.

```typescript
assert(condition, message);
```

::: info Relationship with `invariant`

`assert` has exactly the same functionality as the `invariant` function. The only difference is the name. For more details, see the [`invariant`](./invariant.md) documentation.

:::

## Reference

### `assert(condition, message)`

Use `assert` when a specific condition must be satisfied in your code. If the condition is false, it immediately throws an error and stops program execution.

```typescript
import { assert } from 'es-toolkit/util';

// If the condition is true, nothing happens
assert(true, 'This message will not appear');

// If the condition is false, it throws an error
assert(false, 'This condition is false'); // Error: This condition is false

// When checking that a value is not null or undefined
const value = getValue();
assert(value !== null && value !== undefined, 'Value must not be null or undefined');
// Now you can be sure that value is neither null nor undefined

// When checking if a number is positive
const number = getNumber();
assert(number > 0, 'Number must be positive');
```

You can also pass an error object directly.

```typescript
import { assert } from 'es-toolkit/util';

// Passing an Error object
assert(false, new Error('Custom error message'));

// Using a custom error class
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

assert(false, new ValidationError('Validation failed'));
```

It's especially useful for verifying code assumptions during development or checking that function inputs are within expected ranges.

#### Parameters

- `condition` (`unknown`): The condition to evaluate. If it evaluates to a falsy value, an error is thrown.
- `message` (`string | Error`): The error message or error object to throw when the condition is false.

#### Returns

(`void`): Returns nothing if the condition is true.

#### Throws

Throws the provided message or error object if the condition evaluates to false.
