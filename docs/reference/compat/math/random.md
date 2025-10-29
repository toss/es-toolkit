# random (Lodash Compatibility)

::: warning Use `Math.random()`

This `random` function works slowly due to complex argument processing and type conversion.

Use the faster `Math.random()` instead.

:::

Creates a random number within a range.

```typescript
const result = random(min, max, floating);
```

## Reference

### `random(floating?)`

Creates a random number between 0 and 1.

```typescript
import { random } from 'es-toolkit/compat';

random();
// Returns: 0.123456789 (decimal between 0~1)

random(true);
// Returns: 0.987654321 (returns as decimal)

random(false);
// Returns: 0 or 1 (returns as integer)
```

### `random(max, floating?)`

Creates a random number from 0 to max.

```typescript
import { random } from 'es-toolkit/compat';

random(5);
// Returns: 3.456789 (decimal between 0~5)

random(10, true);
// Returns: 7.123456 (decimal between 0~10)

random(3, false);
// Returns: 2 (integer between 0~3)
```

### `random(min, max, floating?)`

Creates a random number from min to max.

```typescript
import { random } from 'es-toolkit/compat';

random(1, 5);
// Returns: 3.456789 (decimal between 1~5)

random(0, 10, true);
// Returns: 6.789012 (decimal between 0~10)

random(1, 6, false);
// Returns: 4 (integer between 1~6)
```

Range is automatically swapped if reversed.

```typescript
import { random } from 'es-toolkit/compat';

random(5, 1);
// Returns: 3.456789 (range becomes 1~5)
```

Guard object handles special cases.

```typescript
import { random } from 'es-toolkit/compat';

const guard = { 5: 5 };
random(5, 5, guard);
// Returns: 2.345678 (decimal between 0~5)
```

#### Parameters

- `floating` (`boolean`, optional): Whether to return a decimal. Default is `true`.
- `max` (`number`): The maximum value of the range (exclusive).
- `min` (`number`): The minimum value of the range (inclusive).
- `index` (`string | number`): The key to check in the guard object.
- `guard` (`object`): The guard object that validates parameters.

#### Returns

(`number`): Returns a random number within the specified range.
