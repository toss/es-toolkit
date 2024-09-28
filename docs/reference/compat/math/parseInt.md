# parseInt

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Converts `string` to an integer of the specified radix. If `radix` is undefined or 0, a `radix` of 10 is used unless `string` is a hexadecimal, in which case a `radix` of 16 is used.

## Signature

```typescript
function parseInt(string: string, radix?: number, guard?: unknown): number;
```

## Parameters

- `string` (`string`): The string to convert to an integer.
- `radix` (`number`, Optional): The radix to use when converting the string to an integer. Defaults to `0`.
- `guard` (`unknown`, Optional): Enables use as an iteratee for methods like `Array#map`.

## Returns

(`number`): The converted integer.

## Examples

```javascript
import { parseInt } from 'es-toolkit/compat';

parseInt('08'); // => 8
parseInt('0x20'); // => 32

parseInt('08', 10); // => 8
parseInt('0x20', 16); // => 32

['6', '08', '10'].map(parseInt); // => [6, 8, 10]
```
