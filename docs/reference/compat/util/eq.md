# eq

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn’t fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

Performs a [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero) comparison between two values to determine if they are equivalent.

## Signature

```typescript
function eq(value: any, other: any): boolean;
```

### Parameters

- `value` (`any`): The value to compare.
- `other` (`any`): The other value to compare.

### Returns

(`boolean`): Returns `true` if the values are equivalent, else `false`.

## Examples

```typescript
eq(1, 1); // true
eq(0, -0); // true
eq(NaN, NaN); // true
eq('a', Object('a')); // false
```
