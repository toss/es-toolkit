# range (Lodash compatibility)

::: warning Use [range](../../math/range.md) from es-toolkit

This `range` function works slowly due to complex argument processing and type conversion.

Use the faster and more modern [range](../../math/range.md) from `es-toolkit` instead.

:::

Creates an array of numbers in a range.

```typescript
const numbers = range(start, end, step);
```

## Reference

### `range(end)`

Creates an array of numbers from 0 to end, incrementing by 1.

```typescript
import { range } from 'es-toolkit/compat';

range(4);
// Returns: [0, 1, 2, 3]

range(0);
// Returns: []

range(-4);
// Returns: [0, -1, -2, -3]
```

### `range(start, end)`

Creates an array of numbers from start to end, incrementing by 1.

```typescript
import { range } from 'es-toolkit/compat';

range(1, 5);
// Returns: [1, 2, 3, 4]

range(5, 1);
// Returns: [5, 4, 3, 2] (automatically decrements by -1)

range(-2, 3);
// Returns: [-2, -1, 0, 1, 2]
```

### `range(start, end, step)`

Creates an array of numbers from start to end, incrementing by step.

```typescript
import { range } from 'es-toolkit/compat';

range(0, 20, 5);
// Returns: [0, 5, 10, 15]

range(0, -4, -1);
// Returns: [0, -1, -2, -3]

range(1, 4, 0);
// Returns: [] (empty array if step is 0)
```

Decimal steps are also possible.

```typescript
import { range } from 'es-toolkit/compat';

range(0, 1, 0.2);
// Returns: [0, 0.2, 0.4, 0.6, 0.8]

range(1, 0, -0.25);
// Returns: [1, 0.75, 0.5, 0.25]
```

When used as an iteratee, it's handled with a guard object.

```typescript
import { range } from 'es-toolkit/compat';

[1, 2, 3].map(range);
// Returns: [[0], [0, 1], [0, 1, 2]]
```

#### Parameters

- `start` (`number`): The start value of the range (inclusive). If `end` is not provided, this becomes the end value.
- `end` (`number`, optional): The end value of the range (exclusive).
- `step` (`number`, optional): The increment step. Default is 1 or -1.

#### Returns

(`number[]`): Returns an array of numbers in the specified range.
