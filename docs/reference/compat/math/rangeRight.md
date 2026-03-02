# rangeRight (Lodash Compatibility)

::: warning Use [rangeRight](../../math/rangeRight.md) from es-toolkit

This `rangeRight` function works slowly due to complex argument processing and type conversion.

Use the faster and more modern [rangeRight](../../math/rangeRight.md) from `es-toolkit` instead.

:::

Creates an array of numbers in a range in reverse order.

```typescript
const numbers = rangeRight(start, end, step);
```

## Usage

### `rangeRight(end)`

Creates an array of numbers from 0 to end, incrementing by 1, then reverses the order.

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(4);
// Returns: [3, 2, 1, 0]

rangeRight(0);
// Returns: []

rangeRight(-4);
// Returns: [-3, -2, -1, 0]
```

### `rangeRight(start, end)`

Creates an array of numbers from start to end, incrementing by 1, then reverses the order.

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(1, 5);
// Returns: [4, 3, 2, 1]

rangeRight(5, 1);
// Returns: [2, 3, 4, 5] (automatically decrements by -1, then reverses)

rangeRight(-2, 3);
// Returns: [2, 1, 0, -1, -2]
```

### `rangeRight(start, end, step)`

Creates an array of numbers from start to end, incrementing by step, then reverses the order.

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(0, 8, 2);
// Returns: [6, 4, 2, 0]

rangeRight(0, -4, -1);
// Returns: [-3, -2, -1, 0]

rangeRight(1, 4, 0);
// Returns: [1, 1, 1]
```

Decimal steps are also possible.

```typescript
import { rangeRight } from 'es-toolkit/compat';

rangeRight(0, 1, 0.2);
// Returns: [0.8, 0.6, 0.4, 0.2, 0]

rangeRight(1, 0, -0.25);
// Returns: [0.25, 0.5, 0.75, 1]
```

When used as an iteratee, it's handled with a guard object.

```typescript
import { rangeRight } from 'es-toolkit/compat';

[1, 2, 3].map(rangeRight);
// Returns: [[0], [1, 0], [2, 1, 0]]
```

#### Parameters

- `start` (`number`): The start value of the range (inclusive). If `end` is not provided, this becomes the end value.
- `end` (`number`, optional): The end value of the range (exclusive).
- `step` (`number`, optional): The increment step. Default is 1 or -1.

#### Returns

(`number[]`): Returns an array of numbers in the specified range in reverse order.
