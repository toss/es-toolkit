# takeWhile (`Iterator`)

创建一个函数，当谓词成立时惰性地产生迭代器的前导元素。与 [`pipe`](../pipe.md) 一起使用。

```typescript
const result = pipe(source, takeWhile(shouldContinue));
```

::: info

在不需要管道组合的普通代码中，建议使用 `es-toolkit/iterator` 的 [`takeWhile`](../../../reference/iterator/takeWhile.md)：`takeWhile(source, shouldContinue)`。当你要用 `pipe` 串联转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `takeWhile(shouldContinue)`

`takeWhile` 接收一个谓词，并返回一个函数：只要谓词返回真值，就产出元素。迭代在谓词第一次返回假值的元素处停止，源中剩下的元素永远不会被拉取，因此它可以用来限制无限迭代器。如果想在取到固定数量的元素后停止，请改用 [`take`](./take.md)。

```typescript
import { pipe } from 'es-toolkit/fp';
import { takeWhile, toArray } from 'es-toolkit/fp/iterator';

// 取开头小于 3 的数字。
pipe(
  [1, 2, 3, 1].values(),
  takeWhile(x => x < 3),
  toArray()
);
// 返回: [1, 2]
```

#### 参数

- `shouldContinue` (`(value: T, index: number) => boolean`): 以每个元素及其索引调用；一旦它返回假值，迭代就会停止。

#### 返回值

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): 一个将迭代器映射为开头连续匹配元素的惰性迭代器的函数。
