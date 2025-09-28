# inRange (Lodash compatibility)

::: warning Use [inRange](../../math/inRange.md) from `es-toolkit`

This `inRange` function works slowly due to complex type conversion and null/undefined handling.

Use the faster and more modern [inRange](../../math/inRange.md) from `es-toolkit` instead.

:::

Checks if a number is within a specified range.

```typescript
const result = inRange(value, minimum, maximum);
```

## Reference

### `inRange(value, minimum, maximum?)`

Use `inRange` when you want to check if a number is within a specific range. The minimum value is inclusive and the maximum value is exclusive.

```typescript
import { inRange } from 'es-toolkit/compat';

// Basic usage
inRange(3, 2, 4);
// Returns: true (2 ≤ 3 < 4)

inRange(1, 2, 5);
// Returns: false (1 < 2)

inRange(5, 2, 5);
// Returns: false (5 is not included)

// Range boundary values
inRange(2, 2, 4);
// Returns: true (minimum value is included)

inRange(4, 2, 4);
// Returns: false (maximum value is not included)
```

### `inRange(value, maximum)`

When only two arguments are provided, it treats the range as from 0 to maximum.

```typescript
import { inRange } from 'es-toolkit/compat';

inRange(3, 5);
// Returns: true (0 ≤ 3 < 5)

inRange(-1, 5);
// Returns: false (-1 < 0)

inRange(0, 5);
// Returns: true (0 ≤ 0 < 5)

inRange(5, 5);
// Returns: false (5 is not included)
```

If the minimum value is greater than the maximum value, they are automatically swapped.

```typescript
import { inRange } from 'es-toolkit/compat';

inRange(3, 5, 2);
// Returns: true (range becomes 2~5, and 2 ≤ 3 < 5)

inRange(1, 5, 2);
// Returns: false (1 < 2)
```

Invalid values are appropriately converted.

```typescript
import { inRange } from 'es-toolkit/compat';

// String number conversion
inRange(3, '2', '4');
// Returns: true

// Falsy values are treated as 0
inRange(1, null, 5);
// Returns: true (null is treated as 0, so range is 0~5)

inRange(3, false, 5);
// Returns: true (false is treated as 0)
```

#### Parameters

- `value` (`number`): The number to check if it's within the range.
- `minimum` (`number`): The minimum value of the range (inclusive). If `maximum` is not provided, this value becomes the maximum.
- `maximum` (`number`, optional): The maximum value of the range (exclusive).

#### Returns

(`boolean`): Returns `true` if the value is within the specified range, otherwise `false`.
