# shuffle

随机化数组中元素的顺序，使用 Fisher-Yates 算法。

该函数接受一个数组作为参数，并返回一个新数组，其中元素以随机顺序进行了洗牌。

## 签名

```typescript
function shuffle<T>(arr: T[]): T[];
```

### 参数

- `arr` (`T[]`): 要洗牌的数组。

### 返回值

(`T[]`): 元素以随机顺序洗牌后的新数组。

## 示例

```typescript
const array = [1, 2, 3, 4, 5];
const shuffledArray = shuffle(array);
// shuffledArray 将会是一个新数组，其中包含 array 的元素以随机顺序排列，例如 [3, 1, 4, 5, 2]
```
