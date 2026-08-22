# find (`Iterator`)

创建一个函数,返回迭代器中第一个匹配谓词的元素。与 [`pipe`](../../fp/reference/pipe.md) 一起使用。

```typescript
const result = pipe(source, find(predicate));
```

::: info

在普通代码中，建议优先使用原生的 [`Iterator.prototype.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/find)：`source.find(predicate)`。当你要用 `pipe` 组合转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `find(predicate)`

`find` 是一个终结步骤:它会消费迭代器,直到 `predicate` 返回真值为止,并返回该元素;如果没有匹配则返回 `undefined`。它在第一个匹配处停止拉取并关闭源,因此只要会出现匹配的元素,在无限迭代器上使用也是安全的。它委托给原生的 `Iterator.prototype.find`。

```typescript
import { pipe } from 'es-toolkit/fp';
import { find } from 'es-toolkit/fp/iterator';

// 返回第一个超过阈值的元素。
pipe(
  [1, 2, 3, 4].values(),
  find(x => x > 2)
);
// 返回: 3

// 没有匹配时得到 undefined。
pipe(
  [1, 2].values(),
  find(x => x > 10)
);
// 返回: undefined
```

#### 参数

- `predicate` (`(value: T, index: number) => unknown`): 以每个元素及其索引调用;返回真值时选中该元素。

#### 返回值

(`(source: Iterator<T>) => T | undefined`): 一个消费迭代器并返回第一个匹配元素或 `undefined` 的函数。
