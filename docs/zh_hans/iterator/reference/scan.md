# scan (用于 `Iterator`)

惰性地产生迭代器的累积过程,就像一个会输出每个中间结果的 `reduce`。

```typescript
const accumulated = scan(source, callback, initial);
```

## 用法

### `scan(source, callback, initial)`

当你需要归约过程中的每个中间值而不只是最终值时,请使用 `scan`——累计总和、累计最大值、状态机。`initial` 值会最先被输出,之后每处理一个元素就输出一次累加器,因此长度为 `n` 的输入会产生 `n + 1` 个值。这种“scan-left”行为没有对应的原生迭代器辅助方法。

```typescript
import { scan } from 'es-toolkit/iterator';

// 从初始值开始的累计总和。
scan([1, 2, 3].values(), (acc, x) => acc + x, 0).toArray();
// 返回: [0, 1, 3, 6]

// 累加器的类型可以与元素不同。
scan(['a', 'b'].values(), (acc, x) => acc + x, '').toArray();
// 返回: ['', 'a', 'ab']
```

#### 参数

- `source` (`Iterator<T>`): 要累积的迭代器。
- `callback` (`(accumulator: U, value: T, index: number) => U`): 以当前累加器、每个元素及其索引调用;返回下一个累加器。
- `initial` (`U`): 初始累加器,会作为第一个值被输出。

#### 返回值

(`IteratorObject<U, undefined>`): 一个惰性迭代器,依次产生初始值以及每个后续的累加器。它带有所有原生迭代器辅助方法(`map`、`take`、`toArray` 等),可以继续链式调用。

### 在 `pipe` 中使用 `scan(callback, initial)`

当使用 [`pipe`](../../fp/reference/pipe.md) 组合转换时,请从 `es-toolkit/fp/iterator` 导入柯里化形式。它接收回调和初始值,并返回一个接收迭代器的函数。

```typescript
import { pipe } from 'es-toolkit/fp';
import { scan, toArray } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3].values(),
  scan((acc, x) => acc + x, 0),
  toArray()
);
// 返回: [0, 1, 3, 6]
```
