# inverseLerp

Calculates where a number `value` lies between two numbers `start` and `stop`, as a fraction from `0` to `1`. This is the opposite of `lerp`.

```typescript
const fraction = inverseLerp(start, stop, value);
```

## Usage

### `inverseLerp(start, stop, value)`

Use `inverseLerp` when you treat `start` to `stop` as one range and want to know how far along it `value` is. When `value` is `start` you get `0`, when it is `stop` you get `1`, and when it is halfway between them you get `0.5`. This is useful for turning a scroll position or slider value into a progress value from `0` to `1`.

```typescript
import { inverseLerp } from 'es-toolkit/math';

// 50 is halfway between 0 and 100
inverseLerp(0, 100, 50);
// Returns: 0.5

// 12.5 is a quarter of the way from 10 to 20
inverseLerp(10, 20, 12.5);
// Returns: 0.25

// A value of start gives 0, a value of stop gives 1
inverseLerp(0, 100, 0);
// Returns: 0
inverseLerp(0, 100, 100);
// Returns: 1

// start can be greater than stop
inverseLerp(100, 0, 75);
// Returns: 0.25
```

When `value` falls outside `start` and `stop`, the result is also less than `0` or greater than `1`. If you only want a fraction between `0` and `1`, apply `clamp` to the result.

```typescript
import { clamp, inverseLerp } from 'es-toolkit/math';

// A value past stop gives a fraction greater than 1
inverseLerp(0, 100, 150);
// Returns: 1.5

// Keep the result between 0 and 1
clamp(inverseLerp(0, 100, 150), 0, 1);
// Returns: 1
```

When `start` and `stop` are the same number there is no range to measure against, so `0` is returned.

```typescript
import { inverseLerp } from 'es-toolkit/math';

// The range has zero length
inverseLerp(5, 5, 5);
// Returns: 0
```

Combined with `lerp`, you can move a number from one range to another.

```typescript
import { inverseLerp, lerp } from 'es-toolkit/math';

// Move 150 from [100, 200] to [0, 1000]
lerp(0, 1000, inverseLerp(100, 200, 150));
// Returns: 500
```

#### Parameters

- `start` (`number`): The start of the range. Returns `0` when `value` equals this.
- `stop` (`number`): The end of the range. Returns `1` when `value` equals this.
- `value` (`number`): The number to locate within the range.

#### Returns

(`number`): Where `value` lies between `start` and `stop`, as a fraction from `0` to `1`.
