# combinations (函数式编程)

创建一个返回指定大小组合的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, combinations(size));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`combinations`](../../reference/array/combinations.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`combinations` 返回从管道中的数组选择 `size` 个值的所有方式,每个组合内会保留原始顺序。

```typescript
import { combinations, pipe } from 'es-toolkit/fp';

pipe(['a', 'b', 'c'], combinations(2)); // => [['a', 'b'], ['a', 'c'], ['b', 'c']]
```

#### 参数

- `size` (`number`): 每个组合包含的值数量。

#### 返回值

(`(array: readonly T[]) => T[][]`): 一个将 `readonly T[]` 映射为组合数组的函数。

#### 异常

如果 `size` 不是非负整数,则抛出错误。
