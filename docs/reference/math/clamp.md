# clamp

Clamps a number within a specified range.

```typescript
const clamped = clamp(value, maximum);
const clamped = clamp(value, minimum, maximum);
```

## Usage

### `clamp(value, maximum)`

Use `clamp` when you want to restrict a number to be at most a given maximum value. If the value exceeds the maximum, it's clamped to the maximum; otherwise, it returns the original value.

```typescript
import { clamp } from 'es-toolkit/math';

// Clamp to maximum value
const result1 = clamp(10, 5); // result1 is 5 (10 is clamped to maximum 5)
const result2 = clamp(3, 5); // result2 is 3 (less than 5, so unchanged)
```

#### Parameters

- `value` (`number`): The number to clamp.
- `maximum` (`number`): The maximum value.

#### Returns

(`number`): Returns the number clamped to be at most the maximum value.

### `clamp(value, minimum, maximum)`

Use `clamp` when you want to restrict a number within a given minimum and maximum range. If the value falls outside the range, it's clamped to the nearest boundary.

```typescript
import { clamp } from 'es-toolkit/math';

// Clamp within minimum and maximum range
const result1 = clamp(10, 5, 15); // result1 is 10 (within range 5-15)
const result2 = clamp(2, 5, 15); // result2 is 5 (clamped to minimum 5)
const result3 = clamp(20, 5, 15); // result3 is 15 (clamped to maximum 15)
```

#### Parameters

- `value` (`number`): The number to clamp.
- `minimum` (`number`): The minimum value.
- `maximum` (`number`): The maximum value.

#### Returns

(`number`): Returns the number clamped within the specified range.
