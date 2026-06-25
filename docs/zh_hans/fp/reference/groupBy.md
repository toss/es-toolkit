# groupBy (函数式编程)

创建一个按键分组值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, groupBy(getKey));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`groupBy`](../../reference/array/groupBy.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`groupBy` 会对管道中数组的每个值调用 `getKey`,并返回一个以返回键为键、匹配项数组为值的对象。

```typescript
import { groupBy, pipe } from 'es-toolkit/fp';

pipe(
  ['one', 'two', 'three'],
  groupBy(word => word.length)
); // => { 3: ['one', 'two'], 5: ['three'] }
```

#### 参数

- `getKey` (`(item: T) => K`): 为每个值返回分组键的函数。

#### 返回值

(`(array: readonly T[]) => Record<K, T[]>`): 一个将 `readonly T[]` 映射为按键分组数组对象的函数。
