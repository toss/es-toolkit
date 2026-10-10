# dropWhile (`Iterator`)

创建一个函数，当谓词成立时惰性地跳过迭代器的前导元素，然后产生其余元素。与 [`pipe`](../pipe.md) 一起使用。

```typescript
const result = pipe(source, dropWhile(shouldDrop));
```

::: info

在不需要管道组合的普通代码中，建议使用 `es-toolkit/iterator` 的 [`dropWhile`](../../../reference/iterator/dropWhile.md)：`dropWhile(source, shouldDrop)`。当你要用 `pipe` 串联转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `dropWhile(shouldDrop)`

`dropWhile` 接收一个谓词，并返回一个函数：只要谓词返回真值，就跳过元素。从谓词第一次返回假值的那个元素开始，其余所有元素都会被产出。

```typescript
import { pipe } from 'es-toolkit/fp';
import { dropWhile, toArray } from 'es-toolkit/fp/iterator';

// 跳过开头小于 3 的数字。
pipe(
  [1, 2, 3, 1].values(),
  dropWhile(x => x < 3),
  toArray()
);
// 返回: [3, 1]
```

#### 参数

- `shouldDrop` (`(value: T, index: number) => boolean`): 以每个元素及其索引调用；只要它返回真值，元素就会被跳过。

#### 返回值

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): 一个将迭代器映射为被跳过的前导部分之后的元素的惰性迭代器的函数。
