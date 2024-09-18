# maxBy

找出应用 `getValue` 函数到每个元素后具有最大值的元素。

如果列表为空，则返回 `undefined`。

## 签名

```typescript
function maxBy<T>(items: [T, ...T[]], getValue: (element: T) => number): T;
function maxBy<T>(items: T[], getValue: (element: T) => number): T | undefined;
```

### 参数

- `items` (`T[]`): 要搜索的元素数组。
- `getValue` (`(item: T) => number`): 从每个元素中选择数值的函数。

### 返回值

(`T`) 由 `getValue` 函数确定的具有最大值的元素。如果数组为空，则返回 `undefined`。

## 示例

```typescript
maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 返回: { a: 3 }
maxBy([], x => x.a); // 返回: undefined
```
