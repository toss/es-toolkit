# unzipWith

将一个嵌套的数组解压缩，并对重新分组的元素应用一个 `iteratee` 函数。

## 签名

```typescript
function unzipWith<T, R>(target: T[][], iteratee: (...args: T[]) => R): R[];
```

### 参数

- `target` (`T[][]`): 要解压缩的嵌套数组。这是一个数组的数组，其中每个内部数组包含要解压缩的元素。
- `iteratee` (`(...args: T[]) => R`): 用于转换解压缩后的元素的函

### 返回值

(`R[]`): 新的解压缩和转换后的元素数组。

## 示例

```typescript
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];
const result = unzipWith(nestedArray, (item, item2, item3) => item + item2 + item3);
// [9, 12]
```
