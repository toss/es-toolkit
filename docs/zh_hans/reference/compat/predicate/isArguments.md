# isArguments

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

检查一个值是否是 `arguments` 对象。

如果该值是 `arguments` 对象，则返回 `true`，否则返回 `false`。

这个函数也可以在 TypeScript 中作为类型断言使用，将参数的类型缩小为 `arguments` 对象。

## 签名

```typescript
function isArguments(value?: unknown): value is IArguments;
```

### 参数

- `value` (`unknown`): 要检查是否为 `arguments` 对象的值。

### 返回值

(`value is IArguments`): 如果该值是 `arguments` 对象，则返回 `true`，否则返回 `false`。

## 示例

```typescript
import { isArguments } from 'es-toolkit/compat';

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
