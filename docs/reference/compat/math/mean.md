# mean (Lodash compatibility)

::: warning Use [mean](../../math/mean.md) from es-toolkit

This `mean` function works slowly due to type conversion and null/undefined handling.

Use the faster and more modern [mean](../../math/mean.md) from `es-toolkit` instead.

:::

Calculates the average value of an array.

```typescript
const average = mean(array);
```

## Reference

### `mean(array)`

Calculates the average value of a number array.

```typescript
import { mean } from 'es-toolkit/compat';

// Number array
mean([1, 2, 3, 4, 5]);
// Returns: 3

mean([10, 20, 30]);
// Returns: 20

mean([1.5, 2.5, 3.5]);
// Returns: 2.5
```

Empty arrays return NaN.

```typescript
import { mean } from 'es-toolkit/compat';

mean([]);
// Returns: NaN

mean(null);
// Returns: NaN

mean(undefined);
// Returns: NaN
```

Invalid values are ignored in the calculation.

```typescript
import { mean } from 'es-toolkit/compat';

mean([1, undefined, 2, null, 3]);
// Returns: 2 (1 + 2 + 3) / 3 = 2
```

String numbers are also handled.

```typescript
import { mean } from 'es-toolkit/compat';

mean(['1', '2', '3']);
// Returns: 2 (strings are converted to numbers)
```

#### Parameters

- `array` (`ArrayLike<any> | null | undefined`): The array containing numbers to calculate the average from.

#### Returns

(`number`): Returns the average value of the array. Returns `NaN` if the array is empty.
