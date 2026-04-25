# ary (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [`ary`](../../function/ary.md)

由于复杂的参数验证,此 `ary` 函数运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [ary](../../function/ary.md)。

:::

创建一个限制可接收参数数量的函数。

```typescript
const cappedFunction = ary(func, n);
```

## 用法

### `ary(func, n)`

当您想限制函数接收的参数数量时,请使用 `ary`。它在安全地使用接收太多参数的函数或在回调函数中忽略不必要的参数时非常有用。

```typescript
import { ary } from 'es-toolkit/compat';

// 基本用法
function greet(name, age, city) {
  return `你好, ${name}! ${age}岁, 来自${city}。`;
}

const limitedGreet = ary(greet, 2);
console.log(limitedGreet('张三', 30, '北京', '额外参数'));
// "你好, 张三! 30岁, 来自undefined。"
// 第3个参数之后被忽略
```

与数组方法一起使用时,可以防止不必要的参数传递给回调函数。

```typescript
import { ary } from 'es-toolkit/compat';

// parseInt接受第二个参数(基数),但map的回调传递3个参数
const numbers = ['1', '2', '3', '4', '5'];

// 错误用法 - parseInt将索引作为基数接收
console.log(numbers.map(parseInt)); // [1, NaN, NaN, NaN, NaN]

// 使用ary只传递第一个参数
console.log(numbers.map(ary(parseInt, 1))); // [1, 2, 3, 4, 5]
```

可以限制函数只接收所需数量的参数。

```typescript
import { ary } from 'es-toolkit/compat';

function sum(...args) {
  return args.reduce((total, num) => total + num, 0);
}

const sum0 = ary(sum, 0);
const sum1 = ary(sum, 1);
const sum2 = ary(sum, 2);
const sum3 = ary(sum, 3);

console.log(sum0(1, 2, 3, 4, 5)); // 0 (无参数)
console.log(sum1(1, 2, 3, 4, 5)); // 1 (仅第一个参数)
console.log(sum2(1, 2, 3, 4, 5)); // 3 (仅前两个参数)
console.log(sum3(1, 2, 3, 4, 5)); // 6 (仅前三个参数)
```

当传递负数或 `NaN` 时,会被视为0,所有参数都被忽略。

```typescript
import { ary } from 'es-toolkit/compat';

const func = (a, b, c) => [a, b, c];

console.log(ary(func, -1)(1, 2, 3)); // [] (负数视为0)
console.log(ary(func, NaN)(1, 2, 3)); // [] (NaN视为0)
```

#### 参数

- `func` (`Function`): 要限制参数数量的函数。
- `n` (`number`, 可选): 允许的最大参数数量。如果省略,则使用函数的 `length` 属性。

#### 返回值

(`Function`): 返回一个最多接受 `n` 个参数的新函数。
