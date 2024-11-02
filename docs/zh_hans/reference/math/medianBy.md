# medianBy

通过对每个元素应用 `getValue` 函数来计算元素数组的中位数。

[中位数](./median.md)是排序数组中的中间值。
如果数组的元素个数为奇数，中位数就是中间的值。
如果数组的元素个数为偶数，则返回两个中间值的平均值。

如果数组为空，此函数返回`NaN`。

## 签名

```typescript
export function medianBy<T>(items: T[], getValue: (element: T) => number): number;
```

### 参数

- `items` (`T[]`): 要计算中位数的数组。
- `getValue` (`(element: T) => number`): 从每个元素选择数值的函数。

### 返回值

(`number`): 根据 `getValue` 函数确定的所有数值的中位数。

## 示例

```typescript
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], x => x.a); // 返回: 3
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }], x => x.a); // 返回: 2.5
medianBy([], x => x.a); // 返回: NaN
```
