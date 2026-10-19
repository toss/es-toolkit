# lerp

Calculates the number that lies at `fraction` of the way between two numbers `start` and `stop`, using linear interpolation.

```typescript
const result = lerp(start, stop, fraction);
```

## Usage

### `lerp(start, stop, fraction)`

Use `lerp` when you treat `start` to `stop` as one range and need the number at position `fraction` within it. When `fraction` is `0` you get `start`, when it is `1` you get `stop`, and when it is `0.5` you get the number halfway between them. This is useful for computing in-between values in an animation, or for turning a progress value from `0` to `1` into an actual number.

```typescript
import { lerp } from 'es-toolkit/math';

// The number halfway between 0 and 100
lerp(0, 100, 0.5);
// Returns: 50

// The number a quarter of the way from 10 to 20
lerp(10, 20, 0.25);
// Returns: 12.5

// A fraction of 0 gives start, a fraction of 1 gives stop
lerp(0, 100, 0);
// Returns: 0
lerp(0, 100, 1);
// Returns: 100

// start can be greater than stop
lerp(100, 0, 0.25);
// Returns: 75
```

When `fraction` is less than `0` or greater than `1`, the result also falls outside `start` and `stop`. If you only want numbers within the range, apply `clamp` to `fraction` first.

```typescript
import { clamp, lerp } from 'es-toolkit/math';

// The result goes past stop
lerp(0, 100, 1.5);
// Returns: 150

// Keeping fraction between 0 and 1 keeps the result between start and stop
lerp(0, 100, clamp(1.5, 0, 1));
// Returns: 100
```

Combined with `inverseLerp`, you can move a number from one range to another.

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// Move 0.25 from [0, 1] to [10, 20]
lerp(10, 20, 0.25);
// Returns: 12.5

// Move 150 from [100, 200] to [0, 1000]
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### Parameters

- `start` (`number`): The start of the range. Returned when `fraction` is `0`.
- `stop` (`number`): The end of the range. Returned when `fraction` is `1`.
- `fraction` (`number`): The position between start and stop, usually from `0` to `1`.

#### Returns

(`number`): The number that lies at `fraction` of the way between `start` and `stop`.
