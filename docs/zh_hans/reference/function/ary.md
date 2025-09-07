# ary

创建一个新函数，限制给定函数最多只接受`n`个参数。额外传递的参数将被忽略。

```typescript
const limitedFunc = ary(func, n);
```

## 参考

### `ary(func, n)`

当你想限制函数可以接受的参数个数时，使用`ary`函数。

```typescript
import { ary } from 'es-toolkit';

function fn(a: number, b: number, c: number) {
  return Array.from(arguments);
}

// 限制为不接受任何参数
ary(fn, 0)(1, 2, 3); // []

// 限制为只接受1个参数
ary(fn, 1)(1, 2, 3); // [1]

// 限制为只接受2个参数
ary(fn, 2)(1, 2, 3); // [1, 2]
```

`ary`在函数式编程中特别有用。它可以防止回调函数接收到意外的参数。

```typescript
// parseInt接受(string, radix)两个参数，
// 但map会传递(value, index, array)三个参数。

['1', '2', '3'].map(parseInt);
// 结果：[1, NaN, NaN]
// 因为执行了parseInt('2', 1)和parseInt('3', 2)。

// 使用ary限制只传递第一个参数
['1', '2', '3'].map(ary(parseInt, 1));
// 结果：[1, 2, 3] ✅
```

### 参数

- `func` (`F`): 要限制参数个数的函数。
- `n` (`number`): 最多接受的参数个数。

### 返回值

(`(...args: any[]) => ReturnType<F>`): 最多接受`n`个参数的新函数。
