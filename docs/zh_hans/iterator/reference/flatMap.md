# flatMap (`Iterator`)

创建一个函数,惰性地将迭代器的每个元素映射为一个可迭代对象,并把结果展平一层。与 [`pipe`](../../fp/reference/pipe.md) 一起使用。

```typescript
const result = pipe(source, flatMap(callback));
```

::: info

在普通代码中，建议优先使用原生的 [`Iterator.prototype.flatMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flatMap)：`source.flatMap(callback)`。当你要用 `pipe` 组合转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `flatMap(callback)`

`flatMap` 将每个元素映射为一个可迭代对象(或迭代器),并就地产出该可迭代对象的元素,只展平一层。每个内层可迭代对象只有在其元素被拉取时才会被遍历,因此整条流水线保持惰性。它委托给原生的 `Iterator.prototype.flatMap`。

```typescript
import { pipe } from 'es-toolkit/fp';
import { flatMap, toArray } from 'es-toolkit/fp/iterator';

// 将每个元素展开为它自身和它的十倍。
pipe(
  [1, 2].values(),
  flatMap(x => [x, x * 10]),
  toArray()
);
// 返回: [1, 10, 2, 20]
```

#### 参数

- `callback` (`(value: T, index: number) => Iterator<U> | Iterable<U>`): 以每个元素及其索引调用;返回要展平进结果的可迭代对象。

#### 返回值

(`(source: Iterator<T>) => IteratorObject<U, undefined>`): 一个将迭代器映射为展平后元素的惰性迭代器的函数。
