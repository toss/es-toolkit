# floor (Lodash Compatibility)

::: warning Use `Math.floor`

This `floor` function operates slowly due to decimal place calculations and internal function calls.

Use the faster and more modern `Math.floor` instead.

:::

Rounds a number down to the specified decimal places.

```typescript
const result = floor(number, precision);
```

## Usage

### `floor(number, precision?)`

Use `floor` when you want to round a number down to a specific decimal place.

```typescript
import { floor } from 'es-toolkit/compat';

// Basic floor (to integer)
floor(4.9);
// Returns: 4

floor(4.1);
// Returns: 4

// Floor to 2 decimal places
floor(6.994, 2);
// Returns: 6.99

floor(6.999, 2);
// Returns: 6.99

// Floor with negative precision (units of 10)
floor(6040, -2);
// Returns: 6000

floor(1234, -2);
// Returns: 1200

// Negative numbers are also floored
floor(-4.1);
// Returns: -5

floor(-6.994, 2);
// Returns: -7.00
```

#### Parameters

- `number` (`number`): The number to round down.
- `precision` (`number`, optional): The number of decimal places to round down to. Defaults to `0`.

#### Returns

(`number`): Returns the number rounded down to the specified decimal places.
