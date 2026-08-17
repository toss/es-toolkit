# zip (`Iterator`)

惰性地将多个迭代器合并为一个产生元组的迭代器。

```typescript
const pairs = zip(source1, source2);
```

## 用法

### `zip(...sources)`

当你想同步遍历多个序列时,请使用 `zip`——例如,将索引与值配对,或将名字与分数配对。位于相同位置的元素会被组合成元组,并且一旦**最短**的源耗尽,迭代就会停止。在最短的源处停止(而不是像数组版 [`zip`](../../reference/array/zip.md) 那样补齐到最长)正是它能安全地组合有限迭代器和无限迭代器的原因。当迭代结束时——无论是某个源耗尽还是消费者提前停止——所有源都会通过它们的 `return` 方法被关闭。

```typescript
import { zip } from 'es-toolkit/iterator';

// 将相同位置的元素配对。
zip([1, 2, 3].values(), ['a', 'b', 'c'].values()).toArray();
// 返回: [[1, 'a'], [2, 'b'], [3, 'c']]

// 最短的源决定结果的长度。
zip([1, 2, 3].values(), ['a', 'b'].values()).toArray();
// 返回: [[1, 'a'], [2, 'b']]

// 用无上限的计数器给任意序列编号。
import { range } from 'es-toolkit/iterator';

zip(range(0, Infinity), ['a', 'b', 'c'].values()).toArray();
// 返回: [[0, 'a'], [1, 'b'], [2, 'c']]
```

#### 参数

- `sources` (`Array<Iterator<unknown>>`): 要合并的迭代器。

#### 返回值

(`IteratorObject<[...], undefined>`): 一个惰性迭代器,产生由配对元素组成的元组,其类型依据各个源推断。它带有所有原生迭代器辅助方法(`map`、`take`、`toArray` 等),可以继续链式调用。

### 在 `pipe` 中使用 `zip(other)`

当使用 [`pipe`](../../fp/reference/pipe.md) 组合转换时,请从 `es-toolkit/fp/iterator` 导入柯里化形式。它接收另一个迭代器,并将管道中迭代器的元素与之配对。

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, zip } from 'es-toolkit/fp/iterator';

pipe([1, 2, 3].values(), zip(['a', 'b', 'c'].values()), toArray());
// 返回: [[1, 'a'], [2, 'b'], [3, 'c']]
```
