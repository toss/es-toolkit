# unzip (函数式编程)

创建一个按位置重新分组已 zip 数组的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, unzip());
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`unzip`](../../reference/array/unzip.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`unzip` 接收由分组值组成的数组,并返回按每个位置收集值的数组。

```typescript
import { pipe, unzip } from 'es-toolkit/fp';

pipe(
  [
    [1, 'a'],
    [2, 'b'],
  ],
  unzip()
); // => [[1, 2], ['a', 'b']]
```

#### 参数

此函数不接收参数;请以 `unzip()` 的形式调用。

#### 返回值

(`(zipped: ReadonlyArray<[...T]>) => Unzip<T>`): 一个将 zip 后的行映射为按位置分组数组的函数。
