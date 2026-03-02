# random

Generates a random number within a specified range. The number can include decimals.

```typescript
const randomNumber = random(min, max);
```

## Usage

### `random(maximum)` / `random(minimum, maximum)`

Use `random` when you need a random number. It generates numbers with decimal points.

```typescript
import { random } from 'es-toolkit/math';

// Generate a random decimal between 0 and 5 (exclusive).
const num1 = random(5);
console.log(num1); // e.g., 2.718281828

// Generate a random decimal between 2 and 10 (exclusive).
const num2 = random(2, 10);
console.log(num2); // e.g., 7.158765432

// Can be used with negative ranges.
const num3 = random(-5, -1);
console.log(num3); // e.g., -3.842134567

// Decimal ranges are also possible.
const num4 = random(1.5, 2.5);
console.log(num4); // e.g., 1.923456789
```

Throws an error if the range is invalid.

```typescript
import { random } from 'es-toolkit/math';

// An error occurs if the maximum value is 0 or less.
try {
  random(0);
} catch (error) {
  console.error(error.message); // 'Invalid input: The maximum value must be greater than the minimum value.'
}

// An error occurs if the minimum value is greater than or equal to the maximum value.
try {
  random(5, 3);
} catch (error) {
  console.error(error.message); // 'Invalid input: The maximum value must be greater than the minimum value.'
}
```

#### Parameters

- `maximum` (`number`): The maximum value (exclusive) when using a single parameter. Must be greater than 0.
- `minimum` (`number`): The minimum value (inclusive).
- `maximum` (`number`): The maximum value (exclusive). Must be greater than the minimum value.

#### Returns

(`number`): Returns a random decimal within the specified range.

#### Throws

Throws an error if the maximum value is less than or equal to the minimum value.
