# floor

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Computes number rounded down to precision.

This function takes a number and an optional precision value, and returns the number rounded down to the specified number of decimal places.

## Signature

```typescript
function floor(number: number | string, precision: number | string = 0): number;
```

### Parameters

- `number` (`number | string`): The number to round down.
- `precision` (`number | string`, Optional): The precision to round down to, defaults to `0`.

### Returns

(`number`): The rounded down number.

### Example

```typescript
import { floor } from 'es-toolkit/compat';

floor(4.006); // => 4
floor(0.046, 2); // => 0.04
floor(4060, -2); // => 4000
```
