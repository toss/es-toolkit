# take (函数式编程)

创建一个函数,惰性地产生迭代器的前 `limit` 个元素。与 [`pipe`](../../fp/reference/pipe.md) 一起使用。

```typescript
const result = pipe(source, take(limit));
```

::: info

在普通代码中，建议优先使用原生的 [`Iterator.prototype.take`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/take)：`source.take(limit)`。当你要用 `pipe` 组合转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `take(limit)`

`take` 将流水线限制为最多 `limit` 个元素。一旦达到上限,源就会被关闭,不再拉取任何元素,这使它成为从无限迭代器中消费有限前缀的标准方式。它委托给原生的 `Iterator.prototype.take`。

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, take, toArray } from 'es-toolkit/fp/iterator';

// 只有前三个元素会被转换。
pipe([1, 2, 3, 4, 5].values(), map(x => x * 2), take(3), toArray());
// 返回: [2, 4, 6]
```

#### 参数

- `limit` (`number`): 要产生的最大元素数量;必须是非负数。

#### 返回值

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): 一个将迭代器映射为最多 `limit` 个前导元素的惰性迭代器的函数。

#### 异常

如果 `limit` 为负数或 `NaN`,则抛出 `RangeError`(原生行为)。
