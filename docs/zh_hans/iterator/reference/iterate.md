# iterate (用于 `Iterator`)

通过对种子值反复应用一个函数,创建一个无限的惰性迭代器。

```typescript
const sequence = iterate(seed, getNext);
```

## 用法

### `iterate(seed, getNext)`

使用 `iterate` 生成每个值都由前一个值推导而来的序列——幂、连续的日期、重试延迟等等。序列从 `seed` 开始,接着是 `getNext(seed)`、`getNext(getNext(seed))`,依此类推。在迭代器被消费之前不会计算任何值,并且 `getNext` 的运行次数只与被拉取的值的数量相同。

由于该迭代器是无限的,在被消费之前必须用原生 `take` 或 [`takeWhile`](./takeWhile.md) 这样的短路辅助方法加以限制。

```typescript
import { iterate } from 'es-toolkit/iterator';

// 用 take 限制的 2 的幂。
iterate(1, x => x * 2)
  .take(5)
  .toArray();
// 返回: [1, 2, 4, 8, 16]

// 小于一分钟的指数退避延迟。
import { takeWhile } from 'es-toolkit/iterator';

takeWhile(iterate(100, x => x * 2), x => x < 60000).toArray();
// 返回: [100, 200, 400, ..., 51200]
```

#### 参数

- `seed` (`T`): 序列的第一个值。
- `getNext` (`(value: T) => T`): 根据当前值计算下一个值。

#### 返回值

(`IteratorObject<T, undefined>`): 一个产生所生成序列的无限惰性迭代器。它带有所有原生迭代器辅助方法(`map`、`take`、`toArray` 等),可以继续链式调用。
