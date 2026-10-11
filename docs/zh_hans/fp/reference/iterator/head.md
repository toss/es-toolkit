# head (`Iterator`)

创建一个函数，返回迭代器的第一个元素；如果迭代器为空，则返回 `undefined`。与 [`pipe`](../pipe.md) 一起使用。

```typescript
const result = pipe(source, head());
```

::: info

在不需要管道组合的普通代码中，建议使用 `es-toolkit/iterator` 的 [`head`](../../../reference/iterator/head.md)：`head(source)`。当你要用 `pipe` 串联转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `head()`

`head` 是迭代器流水线的一个终结步骤：它只拉取一个元素，然后通过源迭代器的 `return` 方法将其关闭，因此在无限迭代器上使用也是安全的。

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, head } from 'es-toolkit/fp/iterator';

// 获取第一个偶数。
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  head()
);
// 返回: 2
```

#### 返回值

(`(source: Iterator<T>) => T | undefined`): 一个返回迭代器第一个元素的函数；当迭代器不产生任何值时返回 `undefined`。
