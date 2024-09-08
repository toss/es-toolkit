# max

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

在数组中找到具有最大值的元素。


## 签名

```typescript
function max<T>(items: [T, ...T[]]): T;
function max(): undefined;
function max<T>(items?: T[]): T | undefined;
function max<T>(items: T[]): T | undefined;
```

### 参数

- `items` (`T[]`): 要搜索的元素数组。默认为空数组。

### 返回值

(`T | undefined`): 具有最大值的元素，如果数组为空，则为 undefined。