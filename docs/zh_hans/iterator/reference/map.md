# map (用于 `Iterator`)

创建一个函数,惰性地转换迭代器的每个元素。与 [`pipe`](../../fp/reference/pipe.md) 一起使用。

```typescript
const result = pipe(source, map(callback));
```

::: info

在普通代码中，建议优先使用原生的 [`Iterator.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/map)：`source.map(callback)`。当你要用 `pipe` 组合转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `map(callback)`

`map` 接收一个转换函数,并返回一个惰性映射迭代器的函数:每个元素只有在被拉取时才会被转换,因此它可以与短路步骤组合而不做多余的工作。它委托给原生的 `Iterator.prototype.map`。

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, take, toArray } from 'es-toolkit/fp/iterator';

// 惰性转换;只有被消费的两个元素会被计算。
pipe([1, 2, 3, 4].values(), map(x => x * 10), take(2), toArray());
// 返回: [10, 20]
```

#### 参数

- `callback` (`(value: T, index: number) => U`): 以每个元素及其索引调用;返回转换后的元素。

#### 返回值

(`(source: Iterator<T>) => IteratorObject<U, undefined>`): 一个将迭代器映射为转换后元素的惰性迭代器的函数。
