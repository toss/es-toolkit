# some (用于 `Iterator`)

创建一个函数,报告迭代器中是否有任一元素匹配谓词。与 [`pipe`](../../fp/reference/pipe.md) 一起使用。

```typescript
const result = pipe(source, some(predicate));
```

::: info

在普通代码中，建议优先使用原生的 [`Iterator.prototype.some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/some)：`source.some(predicate)`。当你要用 `pipe` 组合转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `some(predicate)`

`some` 是一个终结步骤:它会消费迭代器,直到 `predicate` 返回真值为止,并报告是否有元素匹配。它在第一个匹配处停止拉取,因此只要出现匹配的元素,它就能在无限迭代器上完成。它委托给原生的 `Iterator.prototype.some`。

```typescript
import { pipe } from 'es-toolkit/fp';
import { some } from 'es-toolkit/fp/iterator';

// 一找到偶数就停止。
pipe([1, 3, 4, 5].values(), some(x => x % 2 === 0));
// 返回: true

pipe([1, 3, 5].values(), some(x => x % 2 === 0));
// 返回: false
```

#### 参数

- `predicate` (`(value: T, index: number) => unknown`): 以每个元素及其索引调用;返回真值时短路为 `true`。

#### 返回值

(`(source: Iterator<T>) => boolean`): 一个消费迭代器并返回是否有元素匹配的函数。
