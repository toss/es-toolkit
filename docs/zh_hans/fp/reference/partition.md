# partition (函数式编程)

创建一个把值拆分为通过和未通过两组的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, partition(predicate));
```

## 用法

`partition` 返回一对数组。第一个数组包含使 `predicate` 返回 `true` 的值,第二个数组包含其余值。

```typescript
import { partition, pipe } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], partition(value => value % 2 === 0)); // => [[2, 4], [1, 3]]
```

#### 参数

- `predicate` (`(value: T) => boolean`): 判断每个值属于哪一组的函数。

#### 返回值

(`(array: readonly T[]) => [truthy: T[], falsy: T[]]`): 一个将 `readonly T[]` 映射为通过和未通过数组的函数。
