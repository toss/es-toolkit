# zip (`Iterator`)

创建一个函数，惰性地将迭代器的元素与另一个迭代器的元素配对。与 [`pipe`](../pipe.md) 一起使用。

```typescript
const result = pipe(source, zip(other));
```

::: info

在不需要管道组合的普通代码中，建议使用 `es-toolkit/iterator` 的 [`zip`](../../../reference/iterator/zip.md)：`zip(source, other)`。当你要用 `pipe` 串联转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `zip(other)`

`zip` 接收另一个迭代器，并返回一个函数：把管道传入的迭代器的元素与 `other` 的元素逐个配对。只要任意一个迭代器耗尽，迭代就会立即停止。

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, zip } from 'es-toolkit/fp/iterator';

// 将每个数字与一个字母配对。
pipe([1, 2, 3].values(), zip(['a', 'b', 'c'].values()), toArray());
// 返回: [[1, 'a'], [2, 'b'], [3, 'c']]
```

#### 参数

- `other` (`Iterator<U>`): 要与管道传入的迭代器配对的迭代器。

#### 返回值

(`(source: Iterator<T>) => IteratorObject<[T, U], undefined>`): 一个将迭代器映射为 `[element, otherElement]` 配对的惰性迭代器的函数。
