# es-toolkit/iterator

`es-toolkit/iterator` 为 JavaScript 迭代器提供惰性求值的辅助函数。迭代器流水线不会在每一步之后构建中间数组,而是逐个处理元素,只做实际被消费的那部分工作。

```typescript
import { takeWhile } from 'es-toolkit/iterator';

takeWhile(hugeArray.values(), x => x < 100)
  .map(expensiveTransform) // 原生迭代器辅助方法
  .toArray();
// `expensiveTransform` 只会在小于 100 的前导元素上运行。
```

## es-toolkit/iterator 函数的工作方式

每个函数都接收一个 `Iterator` 作为第一个参数——也就是 `array.values()`、生成器函数、`Map`/`Set` 迭代器等给出的值。惰性函数返回的 `IteratorObject` 以原生的 `Iterator.prototype` 为原型,因此结果带有所有[原生迭代器辅助方法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)(`map`、`filter`、`take`、`drop`、`flatMap`、`reduce`、`toArray` 等),可以与它们无缝地链式调用。

这个模块只提供原生辅助方法缺少的部分。基于数量的 `take` 和 `drop`,以及 `map`、`filter` 等已经存在于 `Iterator.prototype` 上;es-toolkit 在此之上补充了基于谓词的、有状态的以及多数据源的操作:[`cartesianProduct`](./reference/cartesianProduct.md)、[`chunk`](./reference/chunk.md)、[`count`](./reference/count.md)、[`dropWhile`](./reference/dropWhile.md)、[`head`](./reference/head.md)、[`iterate`](./reference/iterate.md)、[`partition`](./reference/partition.md)、[`range`](./reference/range.md)、[`scan`](./reference/scan.md)、[`takeWhile`](./reference/takeWhile.md)、[`uniqBy`](./reference/uniqBy.md) 和 [`zip`](./reference/zip.md)。

## 惰性求值与无限序列

在被请求之前,不会计算任何元素。与原生 `take` 这样的短路辅助方法结合,这让无限序列变得切实可用:

```typescript
import { iterate } from 'es-toolkit/iterator';

// 按需生成的 2 的幂。
iterate(1, x => x * 2)
  .take(5)
  .toArray(); // => [1, 2, 4, 8, 16]
```

## 只能消费一次的语义

与所有 JavaScript 迭代器一样,结果只能消费一次:一旦被消费,就不会再产生任何值。当流水线提前结束时——达到了 `take` 的上限、`for...of` 循环 `break` 了、或者回调抛出了异常——源迭代器会通过它的 `return` 方法被关闭,因此生成器源中的 `try/finally` 清理逻辑会可靠地运行。

```typescript
import { chunk } from 'es-toolkit/iterator';

function* lines() {
  const file = open('data.txt');
  try {
    yield* file.readLines();
  } finally {
    file.close(); // 即使消费者提前停止也会运行。
  }
}

chunk(lines(), 100).take(2).toArray();
```

## 与 pipe 一起使用

所有操作也都以柯里化形式从 `es-toolkit/fp/iterator` 提供,以便与 [`pipe`](../fp/reference/pipe.md) 一起使用;此外还提供了原生辅助方法(`map`、`filter`、`take` 等)的适用于管道的封装。

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, map, take, toArray } from 'es-toolkit/fp/iterator';

pipe(
  hugeArray.values(),
  filter(x => x % 2 === 0),
  map(x => x * 10),
  take(2),
  toArray()
); // => [20, 40]
```

## 与 es-toolkit 的关系

当数据已经是数组并且会被完整处理时,[`es-toolkit`](/zh_hans/intro) 中的数组函数是合适的默认选择。当输入很大或无限、流水线可能提前结束、或者数据本身就以迭代器或生成器的形式到来时,请使用 `es-toolkit/iterator`。
