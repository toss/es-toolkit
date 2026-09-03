# lerp

Linearly interpolates between two numbers.

`lerp` is short for "linear interpolation". It returns the number that is a given fraction of the way from one number to another.

```typescript
const result = lerp(a, b, t);
```

## Usage

### `lerp(a, b, t)`

Use `lerp` when you want the number that lies `t` of the way from `a` to `b`. When `t` is `0` you get `a`, when `t` is `1` you get `b`, and when `t` is `0.5` you get the midpoint. This is useful for animations, progress bars, and mapping a `0` to `1` value onto a range.

```typescript
import { lerp } from 'es-toolkit/math';

// Halfway between 0 and 100
lerp(0, 100, 0.5);
// Returns: 50

// A quarter of the way from 10 to 20
lerp(10, 20, 0.25);
// Returns: 12.5

// t of 0 gives a, t of 1 gives b
lerp(0, 100, 0);
// Returns: 0
lerp(0, 100, 1);
// Returns: 100

// a can be greater than b
lerp(100, 0, 0.25);
// Returns: 75
```

The result is not clamped. When `t` is less than `0` or greater than `1`, the value is extrapolated along the same line. Use `clamp` on `t` first if you need to stay within the range.

```typescript
import { clamp, lerp } from 'es-toolkit/math';

// Extrapolates beyond b
lerp(0, 100, 1.5);
// Returns: 150

// Clamp t to keep the result within [a, b]
lerp(0, 100, clamp(1.5, 0, 1));
// Returns: 100
```

`lerp` is the inverse of `inverseLerp`. Combining them maps a number from one range to another.

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// Map 0.25 from [0, 1] to [10, 20]
lerp(10, 20, 0.25);
// Returns: 12.5

// Map 150 from [100, 200] to [0, 1000]
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### Parameters

- `a` (`number`): The start value, returned when `t` is `0`.
- `b` (`number`): The end value, returned when `t` is `1`.
- `t` (`number`): The interpolation factor, usually between `0` and `1`.

#### Returns

(`number`): The interpolated number.
