# defer

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

延迟调用 `func`，直到当前堆栈清理完毕。调用时，任何附加的参数会传给 `func`。

## 签名

```typescript
function defer<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>): number;
```

### 参数

- `func` (`F`): 要延迟调用的函数。
- `args` (`Parameters<F>`, 可选): 调用 `func` 时提供的参数。

### 返回值

(`number`): 返回计时器 ID。

## 示例

```typescript
import { defer } from 'es-toolkit/compat';

defer(text => {
  console.log(text);
}, 'deferred');
// => 在当前调用栈已清空后打印 'deferred'。
```
