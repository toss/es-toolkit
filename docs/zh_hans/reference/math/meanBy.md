# meanBy

计算数字数组的平均值，通过对每个元素应用 `getValue` 函数来选择数值。

如果数组为空，则此函数返回 `NaN`。

## 签名

```typescript
export function meanBy<T>(items: T[], getValue: (element: T) => number): number;
```

### 参数

- `items` (`T[]`): 要计算平均值的数组。
- `getValue` (`(item: T) => number`): 从每个元素选择数值的函数。

### 返回值

(`number`): 根据 `getValue` 函数确定的所有数值的平均值。

## 示例

```typescript
meanBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 返回: 2
meanBy([], x => x.a); // 返回: NaN
```
