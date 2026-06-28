# windowed (函数式编程)

创建一个从数组返回滑动窗口的函数。与函数式编程的 [`pipe`](./pipe.md) 一起使用。

```typescript
const result = pipe(array, windowed(size, step, options));
```

::: info

在不需要管道组合的普通代码中，建议使用原始 es-toolkit 的 [`windowed`](../../reference/array/windowed.md)。当你要用 [`pipe`](./pipe.md) 串联转换时，请使用这个 `fp` 版本。

:::

## 用法

`windowed` 返回长度为 `size` 的子数组,每次前进 `step`。只返回完整窗口的形式在 [`pipe`](./pipe.md) 中支持惰性求值。

```typescript
import { pipe, windowed } from 'es-toolkit/fp';

pipe([1, 2, 3, 4], windowed(2)); // => [[1, 2], [2, 3], [3, 4]]

pipe([1, 2, 3, 4], windowed(2, 2)); // => [[1, 2], [3, 4]]
```

#### 参数

- `size` (`number`): 每个窗口的长度。
- `step` (`number, optional`): 窗口之间前进的位置数。默认为 `1`。
- `options` (`WindowedOptions, optional`): 选项,例如是否包含末尾的部分窗口。

#### 返回值

(`(array: readonly T[]) => T[][]`): 一个将 `readonly T[]` 映射为滑动窗口数组的函数。

#### 异常

如果 `size` 或 `step` 不是正整数,则抛出错误。
