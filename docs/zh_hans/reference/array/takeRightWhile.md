# takeRightWhile

从数组末尾获取元素，直到谓词函数返回 `false`。

## 签名

```typescript
function takeRightWhile<T>(arr: T[], shouldContinueTaking: (item: T) => boolean): T[];
```

### 参数

- `arr` (`T[]`): 要获取元素的数组。
- `shouldContinueTaking` (`(item: T) => boolean`): 谓词函数，对每个元素调用该函数。只要该函数返回 `true`，就将元素包含在结果中。

### 返回值

(`T[]`) 包含从数组末尾获取的元素，直到谓词函数返回 `false` 的新数组。

## 示例

```typescript
// 返回 [3, 2, 1]
takeRightWhile([5, 4, 3, 2, 1], n => n < 4);

// 返回 []
takeRightWhile([1, 2, 3], n => n > 3);
```
