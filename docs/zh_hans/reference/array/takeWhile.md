# takeWhile

返回一个新数组，其中包含满足提供的谓词函数的前导元素。

一旦有一个元素不满足谓词，就停止获取元素。

## 签名

```typescript
function takeWhile<T>(arr: T[], shouldContinueTaking: (element: T) => boolean): T[];
```

### 参数

- `arr` (`T[]`): 要获取元素的数组。
- `shouldContinueTaking` (`(item: T) => boolean`): 谓词函数，对每个元素调用该函数。只要该函数返回 `true`，就将元素包含在结果中。

### 返回值

(`T[]`) 包含从数组开头获取的元素，直到谓词函数返回 `false` 的新数组。

## 示例

```typescript
// 返回 [1, 2]
takeWhile([1, 2, 3, 4], x => x < 3);

// 返回 []
takeWhile([1, 2, 3, 4], x => x > 3);
```
