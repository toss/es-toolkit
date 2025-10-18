# clamp (Lodash Compatibility)

::: warning Use `es-toolkit`'s [clamp](../../math/clamp.md)

This `clamp` function operates slowly due to NaN validation and handling.

Use the faster and more modern `es-toolkit`'s [clamp](../../math/clamp.md) instead.

:::

Clamps a number within the specified range.

```typescript
const clamped = clamp(number, lower, upper);
```

## Reference

### `clamp(number, lower, upper)`

Use `clamp` when you want to restrict a number between a specified minimum and maximum value.

```typescript
import { clamp } from 'es-toolkit/compat';

// Basic usage
clamp(3, 2, 4);
// Returns: 3 (within range)

clamp(0, 5, 10);
// Returns: 5 (clamped to minimum)

clamp(15, 5, 10);
// Returns: 10 (clamped to maximum)

// Handles negative numbers
clamp(-5, -10, -1);
// Returns: -5

clamp(-15, -10, -1);
// Returns: -10 (clamped to minimum)
```

### `clamp(number, upper)`

When only one argument is provided, it's used as the maximum value.

```typescript
import { clamp } from 'es-toolkit/compat';

// Specifying only maximum
clamp(5, 3);
// Returns: 3 (clamped to maximum)

clamp(2, 3);
// Returns: 2 (within range)

clamp(1, 5);
// Returns: 1
```

NaN values are treated as 0.

```typescript
import { clamp } from 'es-toolkit/compat';

clamp(5, NaN, 10);
// Returns: 5 (NaN is treated as 0, so range is 0-10)

clamp(5, 2, NaN);
// Returns: 2 (NaN is treated as 0, so range is 0-2)
```

#### Parameters

- `number` (`number`): The number to clamp.
- `lower` (`number`): The minimum value. If only the second parameter is provided, it becomes the maximum value.
- `upper` (`number`, optional): The maximum value.

#### Returns

(`number`): Returns the number clamped within the specified range.
