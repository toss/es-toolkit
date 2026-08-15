# pick (函数式编程)

创建一个只保留对象中给定键的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(obj, pick(keys));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`pick`](../../reference/object/pick.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`pick` 返回一个新对象,只包含输入对象中指定的 `keys`。输入对象上不存在的键会被跳过。

```typescript
import { pick, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, pick(['a', 'c'])); // => { a: 1, c: 3 }
```

#### 参数

- `keys` (`readonly K[]`): 要复制到新对象中的键。

#### 返回值

(`(obj: T) => Pick<T, K>`): 一个将对象 `T` 映射为只包含所选键的新对象的函数。
