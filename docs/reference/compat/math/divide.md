# divide (Lodash Compatibility)

::: warning Use the `/` operator

This `divide` function operates slowly due to additional function calls.

Use the faster and simpler `/` operator instead.

:::

Divides two numbers.

```typescript
const result = divide(value, other);
```

## Usage

### `divide(value, other)`

Use `divide` when you want to divide two numbers.

```typescript
import { divide } from 'es-toolkit/compat';

// Basic division
divide(6, 3);
// Returns: 2

divide(10, 5);
// Returns: 2

// Decimal division
divide(7, 2);
// Returns: 3.5

divide(1, 3);
// Returns: 0.3333333333333333

// Division by zero
divide(6, 0);
// Returns: Infinity

divide(-6, 0);
// Returns: -Infinity

// NaN handling
divide(2, NaN);
// Returns: NaN

divide(NaN, 3);
// Returns: NaN

divide(NaN, NaN);
// Returns: NaN
```

#### Parameters

- `value` (`number`): The dividend (number being divided).
- `other` (`number`): The divisor (number dividing by).

#### Returns

(`number`): Returns the result of dividing the first number by the second. If either value is NaN, returns NaN.
