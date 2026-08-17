# drop (用于 `Iterator`)

创建一个函数,惰性地跳过迭代器的前 `count` 个元素并产生其余元素。与 [`pipe`](../../fp/reference/pipe.md) 一起使用。

```typescript
const result = pipe(source, drop(count));
```

::: info

在普通代码中，建议优先使用原生的 [`Iterator.prototype.drop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/drop)：`source.drop(count)`。当你要用 `pipe` 组合转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `drop(count)`

`drop` 跳过固定数量的前导元素。被跳过的元素会从源中拉取,但绝不会被产出;之后的所有元素都会惰性地传递下去。如果想根据条件而不是数量来跳过,请使用 [`dropWhile`](./dropWhile.md)。它委托给原生的 `Iterator.prototype.drop`。

```typescript
import { pipe } from 'es-toolkit/fp';
import { drop, toArray } from 'es-toolkit/fp/iterator';

// 跳过前两个元素。
pipe([1, 2, 3, 4, 5].values(), drop(2), toArray());
// 返回: [3, 4, 5]
```

#### 参数

- `count` (`number`): 要跳过的元素数量;必须是非负数。

#### 返回值

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): 一个将迭代器映射为剩余元素的惰性迭代器的函数。

#### 异常

如果 `count` 为负数或 `NaN`,则抛出 `RangeError`(原生行为)。
