# sortedLastIndexBy

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

此方法与 `sortedLastIndex` 类似，但它接受 `iteratee`，该函数被调用以计算 `value` 和数组每个元素的排序排名。iteratee 被调用时带有一个参数：(value)。

## 签名

```typescript
function sortedLastIndexBy<T, R>(array: ArrayLike<T> | null | undefined, value: T, iteratee?: Iteratee<T, R>): number;
```

### 参数

- `array` (`ArrayLike<T> | null | undefined`): 要检查的已排序数组。
- `value` (`T`): 要评估的值。
- `iteratee` (`(value: T) => R | PropertyName | [PropertyName, any] | Partial<T>`): 每个元素调用的 `iteratee`。

### 返回值

(`number`): 返回应将值插入到数组中的最高索引。

## 示例

```typescript
const objects = [{ n: 4 }, { n: 5 }];
sortedLastIndexBy(objects, { n: 4 }, ({ n }) => n);
// => 1
```
