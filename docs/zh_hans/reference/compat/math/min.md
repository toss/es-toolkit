# min

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

查找数组中具有最小值的元素。


## 签名

```typescript
function min<T>(items: [T, ...T[]]): T;
function min(): undefined;
function min<T>(items?: T[]): T | undefined;
function min<T>(items: T[]): T;
```

### 参数

- `items` (`T[]`): 要搜索的元素数组。默认是空数组。

### 返回值

(`T`): 具有最小值的元素。