# cartesianProduct (`Iterator`)

惰性地计算源迭代器的笛卡尔积。

```typescript
const pairs = cartesianProduct(source1, source2);
```

## 用法

### `cartesianProduct(...sources)`

当你需要多个序列中元素的所有可能组合时,请使用 `cartesianProduct`。例如,将每个用户与每个角色配对,或从参数集合生成测试用例。元组按字典序产生:与数组版 [`cartesianProduct`](../../reference/array/cartesianProduct.md) 一样,最右边的源推进得最快,就像里程表的数字一样。

由于除第一个源之外的所有源都会被多次遍历,它们会在迭代开始时被缓冲为数组。第一个源逐个元素地惰性消费,因此可以是无限迭代器。当迭代结束时 — 无论是第一个源耗尽、其他源为空,还是消费者提前停止 — 每个源都会通过其 `return` 方法关闭。

如果不传入任何源,则只产生一个空元组。如果任何一个源为空,则不产生任何内容。

```typescript
import { cartesianProduct, range } from 'es-toolkit/iterator';

// 将第一个源的每个元素与第二个源的每个元素配对。
cartesianProduct([1, 2].values(), ['a', 'b'].values()).toArray();
// 返回值: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

// 最右边的源推进得最快。
cartesianProduct([0, 1].values(), [0, 1].values(), [0, 1].values()).toArray();
// 返回值: [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]]

// 第一个源可以是无限的;元组按需生成。
cartesianProduct(range(0, Infinity), ['a', 'b'].values()).take(3).toArray();
// 返回值: [[0, 'a'], [0, 'b'], [1, 'a']]
```

#### 参数

- `sources` (`Array<Iterator<unknown>>`): 要计算笛卡尔积的迭代器。

#### 返回值

(`IteratorObject<[...], undefined>`): 产生笛卡尔积元组的惰性迭代器,类型由源决定。它带有所有原生迭代器辅助方法(`map`、`take`、`toArray` 等),可以继续链式调用。

### 与 `pipe` 搭配使用的 `cartesianProduct(other)`

使用 [`pipe`](../../fp/reference/pipe.md) 组合转换时,请从 `es-toolkit/fp/iterator` 导入柯里化形式。它接收另一个迭代器,并将管道传入的迭代器的每个元素与该迭代器的每个元素配对,其中另一个迭代器推进得更快。

```typescript
import { pipe } from 'es-toolkit/fp';
import { cartesianProduct, toArray } from 'es-toolkit/fp/iterator';

pipe([1, 2].values(), cartesianProduct(['a', 'b'].values()), toArray());
// 返回值: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```
