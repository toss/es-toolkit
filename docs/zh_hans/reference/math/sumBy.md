# sumBy

计算数字数组的总和，通过对每个元素应用 `getValue` 函数来选择数值。

如果数组为空，则此函数返回 `0`。

如果 `getValue` 函数返回一个 `bigint`，则函数返回一个 `bigint` 值。但如果数组为空，则此函数返回 `0`。

## 签名

```typescript
function sumBy<T>(items: T[], getValue: (element: T) => number): number;
function sumBy<T>(items: T[], getValue: (element: T) => bigint): bigint | number;
```

### 参数

- `items` (`T[]`): 要计算总和的数组。
- `getValue` (`(item: T) => number | bigint`): 从每个元素选择数值的函数。

### 返回值

(`number | bigint`): 根据 `getValue` 函数确定的所有数值的平均值。

## 示例

```typescript
sumBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 返回: 6
sumBy([], x => x.a); // 返回: 0
sumBy([{ a: 1n }, { a: 2n }, { a: 3n }], x => x.a); // 返回: 6n
```
