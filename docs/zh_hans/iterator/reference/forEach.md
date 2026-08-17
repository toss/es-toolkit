# forEach (用于 `Iterator`)

创建一个函数,消费迭代器并对每个元素运行回调。与 [`pipe`](../../fp/reference/pipe.md) 一起使用。

```typescript
pipe(source, forEach(callback));
```

::: info

在普通代码中，建议优先使用原生的 [`Iterator.prototype.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/forEach)：`source.forEach(callback)`。当你要用 `pipe` 组合转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `forEach(callback)`

`forEach` 是用于执行副作用的终结步骤:它会拉取所有元素,并对每个元素运行 `callback`。因为它会消费整个迭代器,所以不能用于无限迭代器。它委托给原生的 `Iterator.prototype.forEach`。

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, forEach } from 'es-toolkit/fp/iterator';

// 打印每个偶数。
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  forEach(x => console.log(x))
);
// 输出: 2, 4
```

#### 参数

- `callback` (`(value: T, index: number) => void`): 以每个元素及其索引调用。

#### 返回值

(`(source: Iterator<T>) => void`): 一个消费迭代器且不返回任何值的函数。
