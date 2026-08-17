# every (函数式编程)

创建一个函数,报告迭代器的所有元素是否都匹配谓词。与 [`pipe`](../../fp/reference/pipe.md) 一起使用。

```typescript
const result = pipe(source, every(predicate));
```

::: info

在普通代码中，建议优先使用原生的 [`Iterator.prototype.every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/every)：`source.every(predicate)`。当你要用 `pipe` 组合转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `every(predicate)`

`every` 是一个终结步骤:它会消费迭代器,直到 `predicate` 返回假值为止,并报告是否所有元素都匹配。它在遇到第一个不匹配的元素时就停止拉取,因此只要出现不匹配的元素,它就能在无限迭代器上完成。它委托给原生的 `Iterator.prototype.every`。

```typescript
import { pipe } from 'es-toolkit/fp';
import { every } from 'es-toolkit/fp/iterator';

// 所有元素都是偶数。
pipe([2, 4, 6].values(), every(x => x % 2 === 0));
// 返回: true

// 在第一个奇数处停止。
pipe([2, 3, 4].values(), every(x => x % 2 === 0));
// 返回: false
```

#### 参数

- `predicate` (`(value: T, index: number) => unknown`): 以每个元素及其索引调用;返回假值时短路为 `false`。

#### 返回值

(`(source: Iterator<T>) => boolean`): 一个消费迭代器并返回所有元素是否都匹配的函数。
