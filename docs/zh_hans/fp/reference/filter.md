# filter (函数式编程)

创建一个只保留通过测试的元素的函数,等价于 `Array.prototype.filter`。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, filter(predicate));
```

::: info

这个辅助函数专用于 `es-toolkit/fp`。当你想把这个操作作为 [`pipe`](./pipe.md) 管道中的一步来组合时使用它。

:::

## 用法

`filter` 会保留那些使 `predicate` 返回真值的元素。类型谓词会收窄结果的元素类型。它**支持惰性求值**:在 [`pipe`](./pipe.md) 中,它会与相邻的惰性操作融合。

```typescript
import { filter, pipe } from 'es-toolkit/fp';

// 保留偶数。
pipe(
  [1, 2, 3, 4],
  filter(x => x % 2 === 0)
); // => [2, 4]

// 索引作为第二个参数提供。
pipe(
  [10, 20, 30, 40],
  filter((_value, index) => index % 2 === 0)
); // => [10, 30]
```

类型守卫会收窄结果的类型。

```typescript
import { filter, pipe } from 'es-toolkit/fp';

const result = pipe(
  [1, 'a', 2, 'b'],
  filter((x): x is string => typeof x === 'string')
);
// result 的类型为 string[],其值等于 ['a', 'b']
```

#### 参数

- `predicate` (`(value: T, index: number) => boolean`): 对每个元素调用的函数;返回 `true` 以保留该元素。类型守卫(`value is S`)会收窄结果。

#### 返回值

(`(array: readonly T[]) => T[]`): 一个将 `readonly T[]` 映射为筛选后数组的函数。使用类型守卫时,结果为 `S[]`。
