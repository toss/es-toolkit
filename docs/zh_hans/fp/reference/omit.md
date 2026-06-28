# omit (函数式编程)

创建一个从对象中移除给定键的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(obj, omit(keys));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`omit`](../../reference/object/omit.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`omit` 返回一个新对象,其中已从输入对象中移除指定的 `keys`。

```typescript
import { omit, pipe } from 'es-toolkit/fp';

pipe({ a: 1, b: 2, c: 3 }, omit(['b', 'c'])); // => { a: 1 }
```

#### 参数

- `keys` (`readonly K[]`): 要从新对象中排除的键。

#### 返回值

(`(obj: T) => Omit<T, K>`): 一个将对象 `T` 映射为不包含所移除键的新对象的函数。
