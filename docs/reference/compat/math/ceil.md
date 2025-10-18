# ceil (Lodash Compatibility)

::: warning Use `Math.ceil`

This `ceil` function operates slowly due to decimal place calculations and internal function calls.

Use the faster and more modern `Math.ceil` instead.

:::

Rounds a number up to the specified decimal places.

```typescript
const result = ceil(number, precision);
```

## Reference

### `ceil(number, precision?)`

Use `ceil` when you want to round a number up to a specific decimal place.

```typescript
import { ceil } from 'es-toolkit/compat';

// Basic ceiling (to integer)
ceil(4.006);
// Returns: 5

ceil(4.1);
// Returns: 5

// Ceiling to 2 decimal places
ceil(6.004, 2);
// Returns: 6.01

ceil(6.001, 2);
// Returns: 6.01

// Ceiling with negative precision (units of 10)
ceil(6040, -2);
// Returns: 6100

ceil(1234, -2);
// Returns: 1300

// Negative numbers are also rounded up
ceil(-4.1);
// Returns: -4

ceil(-6.004, 2);
// Returns: -6.00
```

#### Parameters

- `number` (`number`): The number to round up.
- `precision` (`number`, optional): The number of decimal places to round up to. Defaults to `0`.

#### Returns

(`number`): Returns the number rounded up to the specified decimal places.
