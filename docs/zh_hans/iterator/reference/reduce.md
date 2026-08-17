# reduce (用于 `Iterator`)

创建一个函数,将迭代器折叠为单个值。与 [`pipe`](../../fp/reference/pipe.md) 一起使用。

```typescript
const result = pipe(source, reduce(callback, initial));
```

::: info

在普通代码中，建议优先使用原生的 [`Iterator.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/reduce)：`source.reduce(callback, initial)`。当你要用 `pipe` 组合转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `reduce(callback, initial)`

`reduce` 是一个终结步骤:它会拉取所有元素,让累加器依次经过 `callback`,并返回最终的累加器。因为它会消费整个迭代器,所以不能用于无限迭代器。如果想保留每个中间的累加器而不只是最终值,请使用 [`scan`](./scan.md)。它委托给原生的 `Iterator.prototype.reduce`。

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, reduce } from 'es-toolkit/fp/iterator';

// 对翻倍后的元素求和。
pipe(
  [1, 2, 3].values(),
  map(x => x * 2),
  reduce((acc, x) => acc + x, 0)
);
// 返回: 12
```

#### 参数

- `callback` (`(accumulator: U, value: T, index: number) => U`): 以当前累加器、每个元素及其索引调用;返回下一个累加器。
- `initial` (`U`): 累加器的初始值。

#### 返回值

(`(source: Iterator<T>) => U`): 一个消费迭代器并返回最终累加器的函数。
