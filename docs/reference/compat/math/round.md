# round (Lodash compatibility)

::: warning Use `Math.round()`

This `round` function works slowly due to precision handling.

Use `Math.round()` instead or calculate to the desired decimal places.

:::

Rounds a number.

```typescript
const rounded = round(number, precision);
```

## Reference

### `round(number, precision?)`

Rounds a number to the specified decimal places.

```typescript
import { round } from 'es-toolkit/compat';

// Basic rounding (0 decimal places)
round(4.006);
// Returns: 4

round(4.6);
// Returns: 5

// Specify decimal places
round(4.006, 2);
// Returns: 4.01

round(4.123456, 3);
// Returns: 4.123
```

Negative precision is also possible.

```typescript
import { round } from 'es-toolkit/compat';

// Round to tens place
round(4060, -2);
// Returns: 4100

round(1234, -1);
// Returns: 1230

round(1234, -3);
// Returns: 1000
```

Handles negative numbers as well.

```typescript
import { round } from 'es-toolkit/compat';

round(-4.006);
// Returns: -4

round(-4.006, 2);
// Returns: -4.01

round(-1234, -2);
// Returns: -1200
```

#### Parameters

- `number` (`number`): The number to round.
- `precision` (`number`, optional): The number of decimal places to round to. Default is `0`.

#### Returns

(`number`): Returns the rounded number.
