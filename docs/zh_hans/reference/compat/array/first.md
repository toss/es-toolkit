# first

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

返回数组的第一个元素，如果数组为空，则返回`undefined`。

此函数接受一个数组并返回数组的第一个元素。
如果数组为空，函数将返回`undefined`。

## 签名

```typescript
function first<T>(arr: ArrayLike<T> | undefined | null): T | undefined;
```

### 参数

- `arr` (`ArrayLike<T> | undefined | null`): 获取第一个元素的数组。

### 返回值

(`T | undefined`): 数组的第一个元素，如果数组为空，则为`undefined`。

## 示例

```typescript
const emptyArr: number[] = [];
const noElement = head(emptyArr);
// noElement will be undefined
```
