# medianBy

通过对每个元素应用 `getValue` 函数来计算元素数组的中位数。

如果数组为空，则此函数返回 `NaN`。
如果数组有奇数个元素，则返回中间的元素。
如果数组有偶数个元素，则返回中间两个元素的平均值。

## 签名

```typescript
export function medianBy<T>(items: readonly T[], getValue: (element: T) => number): number;
```

### 参数

- `items` (`readonly T[]`): 要计算中位数的数组。
- `getValue` (`(element: T) => number`): 从每个元素选择数值的函数。

### 返回值

(`number`): 根据 `getValue` 函数确定的所有数值的中位数。

## 示例

```typescript
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], x => x.a); // 返回: 3
medianBy([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }], x => x.a); // 返回: 2.5
medianBy([], x => x.a); // 返回: NaN
```
