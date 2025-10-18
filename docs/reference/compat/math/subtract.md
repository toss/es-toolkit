# subtract (Lodash Compatibility)

::: warning Use `-` operator

This `subtract` function works slowly due to additional function calls.

Use the faster and simpler `-` operator instead.

:::

Subtracts two numbers.

```typescript
const result = subtract(value, other);
```

## Reference

### `subtract(value, other)`

Use `subtract` when you want to subtract two numbers.

```typescript
import { subtract } from 'es-toolkit/compat';

// Basic subtraction
subtract(6, 4);
// Returns: 2

subtract(10, 3);
// Returns: 7

// Negative number handling
subtract(-6, 4);
// Returns: -10

subtract(6, -4);
// Returns: 10

// NaN handling
subtract(NaN, 4);
// Returns: NaN

subtract(6, NaN);
// Returns: NaN

subtract(NaN, NaN);
// Returns: NaN
```

#### Parameters

- `value` (`number`): The base number for subtraction.
- `other` (`number`): The number to subtract.

#### Returns

(`number`): Returns the result of subtracting the second number from the first. If either is NaN, returns NaN.
