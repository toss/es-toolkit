# takeWhile (`Iterator`)

当谓词成立时,惰性地产生迭代器的前导元素。

```typescript
const leading = takeWhile(source, shouldContinue);
```

## 用法

### `takeWhile(source, shouldContinue)`

当你想根据条件而不是固定数量来停止消费时,请使用 `takeWhile`——例如,读取测量值直到第一个异常值为止。只要 `shouldContinue` 返回真值,元素就会被产出;迭代在它返回假值的第一个元素处停止(且不包含该元素),其余元素永远不会从源中被拉取。这使它成为限制无限迭代器的一种安全方式。原生迭代器辅助方法提供了基于数量的 `take`,但没有基于谓词的 `takeWhile`,这正是提供此函数的原因。

```typescript
import { takeWhile } from 'es-toolkit/iterator';
// 返回: [1, 2]
// 用条件限制无限序列。
import { iterate } from 'es-toolkit/iterator';

// 产出开头连续的小数字。
takeWhile([1, 2, 3, 4, 1].values(), x => x < 3).toArray();

takeWhile(
  iterate(1, x => x * 2),
  x => x < 100
).toArray();
// 返回: [1, 2, 4, 8, 16, 32, 64]
```

#### 参数

- `source` (`Iterator<T>`): 要取元素的迭代器。
- `shouldContinue` (`(value: T, index: number) => boolean`): 以每个元素及其索引调用;一旦它返回假值,迭代就会停止。

#### 返回值

(`IteratorObject<T, undefined>`): 一个惰性迭代器,产生开头连续匹配的元素。它带有所有原生迭代器辅助方法(`map`、`take`、`toArray` 等),可以继续链式调用。

### 在 `pipe` 中使用 `takeWhile(shouldContinue)`

当使用 [`pipe`](../../fp/reference/pipe.md) 组合转换时,请从 `es-toolkit/fp/iterator` 导入柯里化形式。它只接收谓词,并返回一个接收迭代器的函数。

```typescript
import { pipe } from 'es-toolkit/fp';
import { takeWhile, toArray } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 1].values(),
  takeWhile(x => x < 3),
  toArray()
);
// 返回: [1, 2]
```
