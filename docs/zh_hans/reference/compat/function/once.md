# once (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `once`

这个 `once` 函数与 `es-toolkit` 主库的 [once](../../function/once.md) 函数具有相同的功能。

:::

限制函数只能被调用一次。

```typescript
const limitedFunc = once(func);
```

## 参考

### `once(func)`

当您想限制函数只能被调用一次时,使用 `once`。第一次调用后,结果会被缓存并返回相同的值。

```typescript
import { once } from 'es-toolkit/compat';

// 基本用法
let count = 0;
const increment = once(() => {
  count++;
  console.log('计数器递增:', count);
  return count;
});

increment(); // 输出 '计数器递增: 1',返回 1
increment(); // 不输出任何内容,返回 1
increment(); // 不输出任何内容,返回 1

// 实用示例 - 初始化函数
const initialize = once(() => {
  console.log('正在初始化应用程序...');
  // 昂贵的初始化操作
  return '初始化完成';
});

// 即使多次调用,初始化也只执行一次
initialize(); // 输出 '正在初始化应用程序...'
initialize(); // 不输出任何内容
```

在创建昂贵的初始化操作或设置函数时很有用。例如,可以用于数据库连接、API 令牌初始化等。

#### 参数

- `func` (`Function`): 要限制为只调用一次的函数。

#### 返回值

(`Function`): 返回一个新函数,该函数只被调用一次。从第二次调用开始,返回第一次调用的结果。
