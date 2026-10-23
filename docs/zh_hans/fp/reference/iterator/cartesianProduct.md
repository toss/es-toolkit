# cartesianProduct (`Iterator`)

创建一个函数，惰性地计算迭代器与另一个迭代器的笛卡尔积。与 [`pipe`](../pipe.md) 一起使用。

```typescript
const result = pipe(source, cartesianProduct(other));
```

::: info

在不需要管道组合的普通代码中，建议使用 `es-toolkit/iterator` 的 [`cartesianProduct`](../../../reference/iterator/cartesianProduct.md)：`cartesianProduct(source, other)`。当你要用 `pipe` 串联转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `cartesianProduct(other)`

`cartesianProduct` 接收另一个迭代器，并返回一个函数：把管道传入的迭代器的每个元素与 `other` 的每个元素配对，其中 `other` 推进得最快，就像里程表的数字一样。`other` 会在迭代开始时被读入一个数组，而管道传入的迭代器是惰性读取的，因此管道传入的迭代器可以是无限的。

```typescript
import { pipe } from 'es-toolkit/fp';
import { cartesianProduct, toArray } from 'es-toolkit/fp/iterator';

// 将每个数字与每个字母配对。
pipe([1, 2].values(), cartesianProduct(['a', 'b'].values()), toArray());
// 返回: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```

#### 参数

- `other` (`Iterator<U>`): 要与之计算笛卡尔积的迭代器。

#### 返回值

(`(source: Iterator<T>) => IteratorObject<[T, U], undefined>`): 一个将迭代器映射为 `[element, otherElement]` 配对的惰性迭代器的函数。
