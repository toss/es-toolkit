# ary

创建一个限制函数可接收参数数量的新函数。

```typescript
const limitedFunc = ary(func, n);
```

## 用法

### `ary(func, n)`

当您想要限制函数可接收的参数数量时,请使用 `ary`。额外传递的参数将被忽略。这在函数式编程中特别有用,可以防止回调函数接收意外的参数。

```typescript
import { ary } from 'es-toolkit/function';

function fn(a: number, b: number, c: number) {
  return Array.from(arguments);
}

// 限制为不接收任何参数
ary(fn, 0)(1, 2, 3);
// Returns: []

// 限制为只接收 1 个参数
ary(fn, 1)(1, 2, 3);
// Returns: [1]

// 限制为只接收 2 个参数
ary(fn, 2)(1, 2, 3);
// Returns: [1, 2]
```

与 `map` 等数组方法一起使用时特别有用。

```typescript
// parseInt 接收两个参数,但 map 会传递三个参数
['1', '2', '3'].map(parseInt);
// Returns: [1, NaN, NaN]

['1', '2', '3'].map(parseInt);
// 结果: [1, NaN, NaN]
// 因为会执行 parseInt('2', 1), parseInt('3', 2)。

// 使用 ary 限制为只传递第一个参数
['1', '2', '3'].map(ary(parseInt, 1));
// 结果: [1, 2, 3] ✅
```

#### 参数

- `func` (`F`): 要限制参数数量的函数。
- `n` (`number`): 最多可接收的参数数量。

#### 返回值

(`(...args: any[]) => ReturnType<F>`): 最多只接收 `n` 个参数的新函数。
