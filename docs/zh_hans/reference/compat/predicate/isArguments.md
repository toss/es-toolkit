# isArguments

::: info
此函数与 lodash 完全兼容。您可以在我们的[兼容性库](../../../compatibility.md)中找到它，`es-toolkit/compat`。
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
