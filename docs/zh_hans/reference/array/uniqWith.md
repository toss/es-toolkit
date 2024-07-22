# uniqWith

返回一个新数组，仅包含原始数组中基于比较器函数返回值的唯一元素。

## 签名

```typescript
function uniqWith<T>(arr: T[], areItemsEqual: (item1: T, item2: T) => boolean): T[];
```

### 参数

- `arr` (`T[]`): 要处理的数组。
- `areItemsEqual` (`(x: T, y: T) => boolean`): 自定义函数，用于确定两个元素是否相等。此函数接受两个参数，分别来自每个数组，并在元素被认为相等时返回 `true`，否则返回 `false`。

### 返回值

(`T[]`): 一个新数组，仅包含基于比较器函数返回值的原始数组中的唯一元素。

## 示例

```typescript
uniqWith([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], (a, b) => Math.abs(a - b) < 1);
// [1.2, 3.2, 5.7, 7.19]
```
