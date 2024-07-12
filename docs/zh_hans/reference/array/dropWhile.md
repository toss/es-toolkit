# dropWhile

从数组开头移除元素，直到谓词函数返回 false。

该函数迭代数组，并从开头开始移除元素，直到提供的谓词函数返回 false 为止。然后返回剩余元素组成的新数组。

## 签名

```typescript
function dropWhile<T>(arr: T[], canContinueDropping: (item: T) => boolean): T[];
```

### 参数

- `arr` (`T[]`): 要从中移除元素的数组。
- `canContinueDropping` (`(item: T) => boolean`): 一个谓词函数，用于确定是否继续移除元素。该函数将对数组中的每个元素调用，只要返回 true，移除操作就会继续。

### 返回值

(`T[]`) 谓词函数返回 false 后剩余的元素组成的新数组。

## 示例

```typescript
const array = [1, 2, 3, 4, 5];
const result = dropWhile(array, x => x < 3);
// 结果将是 [3, 4, 5]，因为小于 3 的元素从开头被移除了。
```
