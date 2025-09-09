# defaultTo

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Returns the default value for `null`, `undefined`, and `NaN`.

## Signature

```typescript
function defaultTo<T>(value: T | null | undefined, defaultValue?: T): T;
function defaultTo<T, D>(value: T | null | undefined, defaultValue: D): T | D;
```

### Parameters

- `value` (`T | null | undefined`): The value to check.
- `defaultValue` (`D`): The default value to return if the value is `null`, `undefined`, or `NaN`.

### Returns

(`T | D`): Returns either the first value or the default value.

## Examples

```typescript
defaultTo(null, 'default'); // returns 'default'
defaultTo(undefined, 42); // returns 42
defaultTo(NaN, 0); // returns 0
defaultTo('actual', 'default'); // returns 'actual'
defaultTo(123, 0); // returns 123
```
