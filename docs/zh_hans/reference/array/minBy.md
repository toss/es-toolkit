# minBy

找到数组中通过将 `getValue` 函数应用于每个元素后具有最小值的元素。

如果列表为空，则返回 `undefined`。

## 签名

```typescript
function minBy<T>(items: [T, ...T[]], getValue: (element: T) => number): T;
function minBy<T>(items: T[], getValue: (element: T) => number): T | undefined;
```

### 参数

- `items` (`T[]`): 要搜索的元素数组。
- `getValue` (`(item: T) => number`): 从每个元素中选择数值的函数。

### 返回值

(`T`) 由 `getValue` 函数确定的具有最小值的元素。如果数组为空，则返回 `undefined`。

## 示例

```typescript
minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 返回: { a: 1 }
minBy([], x => x.a); // 返回: undefined
```
