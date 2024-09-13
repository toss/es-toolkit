# uniqBy

返回一个新数组，仅包含原始数组中基于 `mapper` 函数返回值的唯一元素。

## 签名

```typescript
function uniqBy<T, U>(arr: T[], mapper: (item: T) => U): T[];
```

### 参数

- `arr` (`T[]`): 要处理的数组。
- `mapper` (`(item: T) => U`): 用于转换数组元素的函数。

### 返回值

(`T[]`): 一个新数组，仅包含原始数组中基于 `mapper` 函数返回值的唯一元素。

## 示例

```typescript
uniqBy([1.2, 1.5, 2.1, 3.2, 5.7, 5.3, 7.19], Math.floor);
// [1.2, 2.1, 3.3, 5.7, 7.19]
```

```typescript
const array = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];
uniqBy(array, item => item.category).length;
// 2
```
