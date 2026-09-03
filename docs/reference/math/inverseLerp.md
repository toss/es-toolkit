# inverseLerp

Calculates where a number lies between two other numbers, as a fraction from `0` to `1`.

This is the inverse of `lerp`, and is also known as normalizing a number to a range.

```typescript
const t = inverseLerp(a, b, value);
```

## Usage

### `inverseLerp(a, b, value)`

Use `inverseLerp` when you want to know how far along a range a number is. When `value` is `a` you get `0`, when `value` is `b` you get `1`, and when `value` is halfway between them you get `0.5`. This is useful for turning a scroll position, slider value, or measurement into a progress fraction.

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 50 is halfway between 0 and 100
inverseLerp(0, 100, 50);
// Returns: 0.5

// 12.5 is a quarter of the way from 10 to 20
inverseLerp(10, 20, 12.5);
// Returns: 0.25

// value of a gives 0, value of b gives 1
inverseLerp(0, 100, 0);
// Returns: 0
inverseLerp(0, 100, 100);
// Returns: 1

// a can be greater than b
inverseLerp(100, 0, 75);
// Returns: 0.25
```

The result is not clamped. When `value` is outside the range, the result is less than `0` or greater than `1`. Use `clamp` on the result if you need to stay within `[0, 1]`.

```typescript
import { clamp, inverseLerp } from 'es-toolkit/math';

// Beyond the end of the range
inverseLerp(0, 100, 150);
// Returns: 1.5

// Clamp the result to [0, 1]
clamp(inverseLerp(0, 100, 150), 0, 1);
// Returns: 1
```

When `a` and `b` are the same number there is no meaningful fraction, so `0` is returned instead of dividing by zero.

```typescript
import { inverseLerp } from 'es-toolkit/math';

// The range is empty
inverseLerp(5, 5, 5);
// Returns: 0
```

`inverseLerp` is the inverse of `lerp`. Combining them maps a number from one range to another.

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// Map 150 from [100, 200] to [0, 1000]
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### Parameters

- `a` (`number`): The start of the range, which maps to `0`.
- `b` (`number`): The end of the range, which maps to `1`.
- `value` (`number`): The number to locate within the range.

#### Returns

(`number`): The fraction of the way `value` is from `a` to `b`.
