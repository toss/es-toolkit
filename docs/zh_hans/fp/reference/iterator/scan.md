# scan (`Iterator`)

创建一个函数，惰性地产生迭代器每一步的累积结果。与 [`pipe`](../pipe.md) 一起使用。

```typescript
const result = pipe(source, scan(callback, initial));
```

::: info

在不需要管道组合的普通代码中，建议使用 `es-toolkit/iterator` 的 [`scan`](../../../reference/iterator/scan.md)：`scan(source, callback, initial)`。当你要用 `pipe` 串联转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `scan(callback, initial)`

`scan` 接收一个回调和一个初始值，并返回一个函数：它会先输出 `initial`，之后每处理一个元素就输出一次累加器。它的作用就像一个也会输出每个中间结果的 [`reduce`](./reduce.md)。

```typescript
import { pipe } from 'es-toolkit/fp';
import { scan, toArray } from 'es-toolkit/fp/iterator';

// 逐步输出累计总和。
pipe(
  [1, 2, 3].values(),
  scan((acc, x) => acc + x, 0),
  toArray()
);
// 返回: [0, 1, 3, 6]
```

#### 参数

- `callback` (`(accumulator: U, value: T, index: number) => U`): 以当前累加器、每个元素及其索引调用；返回下一个累加器。
- `initial` (`U`): 初始累加器，会作为第一个值被输出。

#### 返回值

(`(source: Iterator<T>) => IteratorObject<U, undefined>`): 一个将迭代器映射为依次产生初始值以及每个后续累加器的惰性迭代器的函数。
