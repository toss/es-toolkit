# uniqBy (`Iterator`)

创建一个函数，惰性地产生迭代器中键此前未出现过的元素。与 [`pipe`](../pipe.md) 一起使用。

```typescript
const result = pipe(source, uniqBy(getKey));
```

::: info

在不需要管道组合的普通代码中，建议使用 `es-toolkit/iterator` 的 [`uniqBy`](../../../reference/iterator/uniqBy.md)：`uniqBy(source, getKey)`。当你要用 `pipe` 串联转换时，请使用这个 `es-toolkit/fp/iterator` 版本。

:::

## 用法

### `uniqBy(getKey)`

`uniqBy` 接收一个键函数，并返回一个函数：对于每个元素，只有当它的键第一次出现时才会产出该元素，并保持原来的顺序。键的比较方式与 `Set` 比较值的方式相同。

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, uniqBy } from 'es-toolkit/fp/iterator';

// 每个整数部分只保留第一个数字。
pipe([1.1, 1.2, 2.3, 2.4].values(), uniqBy(Math.floor), toArray());
// 返回: [1.1, 2.3]
```

#### 参数

- `getKey` (`(value: T) => K`): 将元素映射为用于检测重复的键。

#### 返回值

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): 一个将迭代器映射为移除重复键之后的元素的惰性迭代器的函数。
