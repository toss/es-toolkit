# ceil

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Computes number rounded up to precision.

This function takes a number and an optional precision value, and returns the number rounded up to the specified number of decimal places.

## Signature

```typescript
function ceil(number: number | string, precision: number | string = 0): number;
```

### Parameters

- `number` (`number | string`): The number to round up.
- `precision` (`number | string`, Optional): The precision to round up to, defaults to `0`.

### Returns

(`number`): The rounded up number.

### Example

```typescript
import { ceil } from 'es-toolkit/compat';

ceil(4.006); // => 5
ceil(6.004, 2); // => 6.01
ceil(6040, -2); // => 6100
```
