# uniqWith

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

此方法类似于`uniq`，只是它接收一个`comparator`用于确定元素的相等性。

它创建一个数组的无重复版本，其中只保留每个元素的第一次出现。
如果提供了`comparator`，它将使用两个参数调用：`(arrVal, othVal)`来比较元素。
如果没有提供比较器，则使用浅层相等性。

结果值的顺序由它们在输入数组中的出现顺序决定。

## 签名

```typescript
function uniqWith<T>(arr: ArrayLike<T> | null | undefined, comparator?: Comparator<T>): T[];
```

### 参数

- `arr` (`ArrayLike<T> | null | undefined`): 要处理的数组。
- `comparator` (`Comparator<T>`): 用于比较元素相等性的可选函数。

### 返回值

(`T[]`): 一个基于比较器的仅包含唯一值的新数组。

## 示例

```typescript
const array = [1, 2, 2, 3];
const result = uniqWith(array);
// result will be [1, 2, 3]

const array = [1, 2, 3];
const result = uniqWith(array, (a, b) => a % 2 === b % 2)
// result will be [1, 2]
```
