# toArray (用于 `Iterator`)

创建一个函数,将迭代器的元素收集到一个数组中。与 [`pipe`](../../fp/reference/pipe.md) 一起使用。

```typescript
const result = pipe(source, toArray());
```

::: info

在普通代码中，建议优先使用原生的 [`Iterator.prototype.toArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/toArray)：`source.toArray()`。当你要用 `pipe` 组合转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `toArray()`

`toArray` 是迭代器流水线最常见的终结步骤:它会拉取所有元素,并把它们作为数组返回。因为它会消费整个迭代器,所以不能用于无限迭代器——请先用 [`take`](./take.md) 或 [`takeWhile`](./takeWhile.md) 限制流水线。它委托给原生的 `Iterator.prototype.toArray`。

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, toArray } from 'es-toolkit/fp/iterator';

// 把转换后的元素收集成数组。
pipe([1, 2, 3].values(), map(x => x * 2), toArray());
// 返回: [2, 4, 6]
```

#### 返回值

(`(source: Iterator<T>) => T[]`): 一个消费迭代器并将其元素作为数组返回的函数。
