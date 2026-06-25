# zip (函数式编程)

创建一个按索引组合多个数组值的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, zip(...arrs));
```

## 用法

`zip` 会组合管道中的数组和配置数组在相同索引处的值。如果数组长度不同,缺失值会是 `undefined`。

```typescript
import { zip, pipe } from 'es-toolkit/fp';

pipe([1, 2], zip(['a', 'b'])); // => [[1, 'a'], [2, 'b']]

pipe([1, 2, 3], zip(['a'])); // => [[1, 'a'], [2, undefined], [3, undefined]]
```

#### 参数

- `arrs` (`Array<readonly T[]>`): 要与管道中的数组一起 zip 的数组。

#### 返回值

(`(array: readonly T[]) => T[][]`): 一个将管道中的数组映射为按索引分组行的函数。
