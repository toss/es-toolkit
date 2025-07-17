# isNative

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

检查`value`是否为原生函数。

原生函数是指JavaScript引擎本身实现的函数。例如，`Array.prototype.map`、`Object.keys`、`Function.prototype.bind`等。

## 签名

```typescript
function isNative(value: unknown): boolean;
```

### 参数

- `value` (`unknown`): 要检查的值

### 返回值

(`boolean`): 如果`value`是原生函数则返回`true`，否则返回`false`。

## 示例

```typescript
import { isNative } from 'es-toolkit/compat/predicate';

console.log(isNative(Array.prototype.push)); // => true
console.log(isNative(function () {})); // => false
console.log(isNative(Math.max)); // => true
console.log(isNative(() => {})); // => false
```
