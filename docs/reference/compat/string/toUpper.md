# toUpper

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Converts the given value to a string and transforms it to upper case. The function can handle various input types by first converting them to strings.

## Signature

```typescript
function toUpper(value?: unknown): string;
```

## Parameters

- `value`(`unknown`) : The value to convert to upper case. If omitted, returns an empty string.

## Returns

`string` : The upper case version of the input value converted to a string.

## Examples

```typescript
import { toUpper } from 'es-toolkit';

toUpper('--foo-bar--'); // returns '--FOO-BAR--'
toUpper('Hello World'); // returns 'HELLO WORLD'
toUpper(null); // returns ''
toUpper([1, 2, 3]); // returns '1,2,3'
toUpper(123); // returns '123'
toUpper(); // returns ''
```
