# inRange

Checks if a value is within a specified range.

```typescript
const result = inRange(value, maximum);
const result = inRange(value, minimum, maximum);
```

## Usage

### `inRange(value, maximum)`

Use `inRange` when you want to check if a value is within the range from 0 to less than the maximum value. The minimum value is automatically set to 0.

```typescript
import { inRange } from 'es-toolkit/math';

// Check within the range from 0 to less than 5
const result1 = inRange(3, 5); // result1 is true (0 <= 3 < 5)
const result2 = inRange(5, 5); // result2 is false (5 is not less than 5)
const result3 = inRange(-1, 5); // result3 is false (-1 < 0)
```

#### Parameters

- `value` (`number`): The value to check.
- `maximum` (`number`): The maximum value of the range (exclusive).

#### Returns

(`boolean`): Returns `true` if the value is within the range from 0 (inclusive) to the maximum value (exclusive), otherwise `false`.

### `inRange(value, minimum, maximum)`

Use `inRange` when you want to check if a value is within a specified minimum and maximum range.

```typescript
import { inRange } from 'es-toolkit/math';

// Check within the minimum and maximum range
const result1 = inRange(3, 2, 5); // result1 is true (2 <= 3 < 5)
const result2 = inRange(1, 2, 5); // result2 is false (1 < 2)
const result3 = inRange(5, 2, 5); // result3 is false (5 is not less than 5)

// Can be used with negative ranges
const result4 = inRange(-3, -5, -1); // result4 is true (-5 <= -3 < -1)
```

#### Parameters

- `value` (`number`): The value to check.
- `minimum` (`number`): The minimum value of the range (inclusive).
- `maximum` (`number`): The maximum value of the range (exclusive).

#### Returns

(`boolean`): Returns `true` if the value is within the specified range, otherwise `false`.

#### Throws

Throws an error if the minimum is greater than or equal to the maximum.
