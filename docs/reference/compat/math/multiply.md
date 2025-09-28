# multiply (Lodash compatibility)

::: warning Use `*` operator

This `multiply` function works slowly due to additional function calls.

Use the faster and simpler `*` operator instead.

:::

Multiplies two numbers.

```typescript
const result = multiply(value, other);
```

## Reference

### `multiply(value, other)`

Use `multiply` when you want to multiply two numbers.

```typescript
import { multiply } from 'es-toolkit/compat';

// Basic multiplication
multiply(2, 3);
// Returns: 6

multiply(4, 5);
// Returns: 20

// Negative number handling
multiply(2, -3);
// Returns: -6

multiply(-4, -5);
// Returns: 20

// Decimal number handling
multiply(2.5, 4);
// Returns: 10

// NaN handling
multiply(NaN, 3);
// Returns: NaN

multiply(2, NaN);
// Returns: NaN

multiply(NaN, NaN);
// Returns: NaN
```

#### Parameters

- `value` (`number`): The first number in the multiplication.
- `other` (`number`): The second number in the multiplication.

#### Returns

(`number`): Returns the result of multiplying the two numbers. If either is NaN, returns NaN.
