# toString

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Converts `value` to a string.

An empty string is returned for `null` and `undefined` values.
The sign of `-0` is preserved.

## Signature

```typescript
function toString(value?: unknown): string;
```

### Parameters

- `value` (`unknown`): The value to convert.

### Returns

(`string`): Returns the converted string.

## Examples

```typescript
toString(null); // returns ''
toString(undefined); // returns ''
toString(-0); // returns '-0'
toString([1, 2, -0]); // returns '1,2,-0'
toString([Symbol('a'), Symbol('b')]); // returns 'Symbol(a),Symbol(b)'
```
