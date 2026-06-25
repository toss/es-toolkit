# countBy (函数式编程)

创建一个按键统计值数量的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, countBy(mapper));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`countBy`](../../reference/array/countBy.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`countBy` 会对管道中数组的每个值调用 `mapper`,并返回一个以 mapper 结果为键、出现次数为值的对象。

```typescript
import { countBy, pipe } from 'es-toolkit/fp';

pipe(
  ['one', 'two', 'three'],
  countBy(word => word.length)
); // => { 3: 2, 5: 1 }
```

#### 参数

- `mapper` (`(item: T) => K`): 返回用于计数的键的函数。

#### 返回值

(`(array: readonly T[]) => Record<K, number>`): 一个将 `readonly T[]` 映射为按键计数对象的函数。
