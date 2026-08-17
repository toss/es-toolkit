# filter (`Iterator`)

创建一个函数,惰性地保留迭代器中匹配谓词的元素。与 [`pipe`](../../fp/reference/pipe.md) 一起使用。

```typescript
const result = pipe(source, filter(predicate));
```

::: info

在普通代码中，建议优先使用原生的 [`Iterator.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter)：`source.filter(predicate)`。当你要用 `pipe` 组合转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `filter(predicate)`

`filter` 接收一个谓词,并返回一个函数,该函数惰性地保留谓词返回真值的元素。当谓词是类型守卫(`(value): value is S`)时,元素类型会相应收窄。它委托给原生的 `Iterator.prototype.filter`。

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, toArray } from 'es-toolkit/fp/iterator';

// 只保留偶数。
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  toArray()
);
// 返回: [2, 4]
```

#### 参数

- `predicate` (`(value: T, index: number) => unknown`): 以每个元素及其索引调用;返回真值时保留该元素。

#### 返回值

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): 一个将迭代器映射为被保留元素的惰性迭代器的函数。
