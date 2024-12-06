# sortedIndexBy

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。
:::

确定将给定值插入排序数组以保持其排序顺序的最低索引。与 [sortedIndex](./sortedIndex.md) 不同的是，此函数允许指定一个自定义迭代函数来提取值进行比较。

- 数组元素和插入的值都会调用 iteratee。
- 这对于包含对象或自定义数据类型的数组特别有用，因为在这些数组中，排序顺序是基于特定属性或计算值的。

## 签名

```typescript
function sortedIndexBy<T, R>(
  array: ArrayLike<T> | null | undefined,
  value: T,
  iteratee: (value: T) => R,
  retHighest?: boolean
): number;
```

### 参数

- `array` (`ArrayLike<T> | null | undefined`)：
  要检查的排序数组。可以是 null 或 undefined，在这种情况下，它将被视为空数组。
- `value` (`T`)：
  要评估的值，为插入找到合适的索引。
- `iteratee` (`(item: T) => R`)：
  一个转换数组元素和要插入的值的函数。该函数通过返回用于比较的值来确定排序顺序。

### 返回值

(`number`)： 为保持排序顺序而插入值的索引。

## 示例

```typescript
import { sortedIndexBy } from 'es-toolkit/compat'；

const objects = [{ x: 10 }, { x: 20 }, { x: 30 }]；

// 使用迭代器提取 `x` 属性进行比较
sortedIndexBy(objects, { x: 25 }, o => o.x)；
// 返回值：2
// 解释： 根据 `x` 属性，`{ x: 25 }` 返回索引 2。

// 处理自定义排序逻辑
const strings = ['apple', 'banana', 'cherry']；
sortedIndexBy(strings, 'apricot', str => str.length)；
// 返回值：1
// 解释： 根据字符串长度，'apricot'返回索引 1。
```
