# isMatchWith

::: info
This function is only available in `es-toolkit/compat` for compatibility reasons. It either has alternative native JavaScript APIs or isn't fully optimized yet.

When imported from `es-toolkit/compat`, it behaves exactly like lodash and provides the same functionalities, as detailed [here](../../../compatibility.md).
:::

This method is like `isMatch` except that it accepts `customizer` which is invoked to compare values. If `customizer` returns `undefined`, comparisons are handled by the method instead. The `customizer` is invoked with five arguments: (objValue, srcValue, index|key, object, source).

## Signature

```typescript
function isMatchWith(
  target: unknown,
  source: unknown,
  customizer?: (
    objValue: any,
    srcValue: any,
    key: PropertyKey,
    object: any,
    source: any,
    stack?: Map<any, any>
  ) => unknown
): boolean;
```

### Parameters

- `target` (`unknown`): The object to inspect.
- `source` (`unknown`): The object of property values to match.
- `customizer` (`Function`, optional): The function to customize comparisons.

### Returns

(`boolean`): Returns `true` if `object` is a match, else `false`.

## Examples

```typescript
import { isMatchWith } from 'es-toolkit/compat';

function isGreeting(value) {
  return /^h(?:i|ello)$/.test(value);
}

function customizer(objValue, srcValue) {
  if (isGreeting(objValue) && isGreeting(srcValue)) {
    return true;
  }
}

const object = { greeting: 'hello' };
const source = { greeting: 'hi' };

isMatchWith(object, source, customizer);
// => true
```
