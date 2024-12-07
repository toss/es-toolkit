# now

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

返回自1970年1月1日00:00:00 UTC以来经过的毫秒数。

## 签名

```typescript
function now(): number;
```

### 返回值

(`number`): 自1970年1月1日00:00:00 UTC以来经过的毫秒数。

## 示例

```typescript
const currentTime = now();
console.log(currentTime); // Outputs the current time in milliseconds

const startTime = now();
// Some time-consuming operation
const endTime = now();
console.log(`Operation took ${endTime - startTime} milliseconds`);
```
