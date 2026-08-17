# dropWhile

当谓词成立时,惰性地跳过迭代器的前导元素,然后产生其余元素。

```typescript
const rest = dropWhile(source, shouldDrop);
```

## 用法

### `dropWhile(source, shouldDrop)`

当你想根据条件而不是固定数量来跳过开头的一段元素时,请使用 `dropWhile`——例如,跳过日志行直到第一条错误为止。只要 `shouldDrop` 返回真值,元素就会被跳过;从第一个不满足条件的元素起(包括该元素在内)的所有元素都会被产出。原生迭代器辅助方法提供了基于数量的 `drop`,但没有基于谓词的 `dropWhile`,这正是提供此函数的原因。

```typescript
import { dropWhile } from 'es-toolkit/iterator';

// 跳过开头连续的小数字。
dropWhile([1, 2, 3, 1].values(), x => x < 3).toArray();
// 返回: [3, 1]

// 一旦第一个元素就不满足谓词,则不会跳过任何元素。
dropWhile([5, 1, 2].values(), x => x < 3).toArray();
// 返回: [5, 1, 2]
```

#### 参数

- `source` (`Iterator<T>`): 要跳过元素的迭代器。
- `shouldDrop` (`(value: T, index: number) => boolean`): 以每个元素及其索引调用;只要它返回真值,元素就会被跳过。

#### 返回值

(`IteratorObject<T, undefined>`): 一个惰性迭代器,产生被跳过的前导部分之后的元素。它带有所有原生迭代器辅助方法(`map`、`take`、`toArray` 等),可以继续链式调用。

### 在 `pipe` 中使用 `dropWhile(shouldDrop)`

当使用 [`pipe`](../../fp/reference/pipe.md) 组合转换时,请从 `es-toolkit/fp/iterator` 导入柯里化形式。它只接收谓词,并返回一个接收迭代器的函数。

```typescript
import { pipe } from 'es-toolkit/fp';
import { dropWhile, toArray } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 1].values(),
  dropWhile(x => x < 3),
  toArray()
);
// 返回: [3, 1]
```
