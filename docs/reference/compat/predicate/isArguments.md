# isArguments

::: info
This function is fully compatible with lodash. You can find it in our [compatibility library](../../../compatibility.md), `es-toolkit/compat`.
:::

Check if a value is an arguments object.

It returns `true` if the value is an arguments object, and `false` otherwise.

This function can also serve as a type predicate in TypeScript, narrowing the type of the argument to an arguments object.

## Signature

```typescript
function isArguments(value: unknown): value is IArguments;
```

### Parameters

- `value` (`unknown`): The value to test if it is an arguments object.

### Returns

(`value is IArguments`): Returns `true` if the value is an arguments, `false` otherwise.

## Examples

```typescript
import { isArguments } from 'es-toolkit/predicate';

const args = (function () {
  return arguments;
})();
const strictArgs = (function () {
  'use strict';
  return arguments;
})();
const value = [1, 2, 3];

console.log(isArguments(args)); // true
console.log(isArguments(strictArgs)); // true
console.log(isArguments(value)); // false
```
