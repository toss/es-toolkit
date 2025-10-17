# flip (Lodash 兼容性)

::: warning 使用直接的参数反转
这个 `flip` 函数只是简单地反转函数参数的顺序。在大多数情况下，它可以用更简单的方法替代。

建议使用更快、更现代的 `(...args) => func(...args.reverse())` 或直接传递参数。
:::

创建一个函数,该函数反转给定函数的参数顺序。

```typescript
const flippedFunc = flip(func);
```

## 参考

### `flip(func)`

当您想要通过反转参数顺序来创建新函数时,请使用 `flip`。它将原本从第一个参数开始按顺序接收的函数改为从最后一个参数开始接收。

```typescript
import { flip } from 'es-toolkit/compat';

function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const flipped = flip(greet);
flipped('John', 'Hello'); // 'Hello, John!'

// 原始函数按 (greeting, name) 顺序接收参数
// 但反转后的函数按 (name, greeting) 顺序接收参数
```

对于接受多个参数的函数,所有参数的顺序都会反转。

```typescript
import { flip } from 'es-toolkit/compat';

function fn(a: string, b: string, c: string, d: string) {
  return [a, b, c, d];
}

const flipped = flip(fn);
flipped('1', '2', '3', '4'); // ['4', '3', '2', '1']
```

#### 参数

- `func` (`F`): 要反转参数的函数。

#### 返回值

(`(...args: Reversed<Parameters<F>>) => ReturnType<F>`): 返回参数顺序已反转的新函数。
