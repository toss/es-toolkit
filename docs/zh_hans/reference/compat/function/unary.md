# unary (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 `ary`

此 `unary` 函数是作为 `ary` 函数的特殊情况实现的。如果您需要更多控制,直接使用 `es-toolkit` 的 [ary](../../function/ary.md) 会更高效。

请改用更快、更现代的 `es-toolkit` 的 [ary](../../function/ary.md)。

:::

限制函数最多接受一个参数。

```typescript
const limitedFunc = unary(func);
```

## 参考

### `unary(func)`

当您想限制函数最多接受一个参数时,请使用 `unary`。传递的任何额外参数都将被忽略。

```typescript
import { unary } from 'es-toolkit/compat';

function greet(name, greeting, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

// 转换为只接受第一个参数的函数
const greetOne = unary(greet);
greetOne('Alice', 'Hello', '!'); // 与 greet('Alice') 相同

// 与数组的 map 函数一起使用时很有用
const numbers = ['1', '2', '3'];
numbers.map(parseInt); // [1, NaN, NaN] - 意外结果
numbers.map(unary(parseInt)); // [1, 2, 3] - 正确结果
```

#### 参数

- `func` (`(...args: any[]) => any`): 要限制参数的函数。

#### 返回值

(`(...args: any[]) => any`): 返回最多接受一个参数的新函数。
