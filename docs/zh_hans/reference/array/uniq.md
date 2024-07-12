# uniq

创建一个数组的无重复版本。

该函数接受一个数组，并返回一个新数组，其中仅包含原始数组中的唯一值，保留首次出现的顺序。

## 签名

```typescript
function uniq<T>(arr: T[]): T[];
```

### 参数

- `arr` (`T[]`): 要处理的数组。

### 返回值

(`T[]`): 一个新数组，仅包含原始数组中的唯一值。

## 示例

```typescript
const array = [1, 2, 2, 3, 4, 4, 5];
const result = uniq(array);
// result 将会是 [1, 2, 3, 4, 5]
```
