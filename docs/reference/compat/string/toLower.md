# toLower

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Converts the given value to a string and transforms it to lower case. The function can handle various input types by first converting them to strings.

## Signature

```typescript
function toLower(value?: unknown): string;
```

### Parameters

- `value` (`unknown`): The value to convert.

### Returns

(`string`): Returns the lower cased string.

## Examples

```typescript
toLower('--FOO-BAR--');
// => '--foo-bar--'

toLower(null);
// => ''

toLower([1, 2, 3]);
// => '1,2,3'
```
