# attempt

执行函数并将结果或错误作为元组返回。

```typescript
const [error, result] = attempt(func);
```

## 参考

### `attempt(func)`

当您想安全地执行函数时,请使用 `attempt`。它允许您在不使用 try-catch 块包装代码的情况下处理错误。

```typescript
import { attempt } from 'es-toolkit/util';

// 成功的情况
const [error, result] = attempt(() => 42);
// error 为 null,result 为 42

// 发生错误的情况
const [error, result] = attempt(() => {
  throw new Error('出现问题了');
});
// error 是 Error 对象,result 为 null

// 您也可以指定类型
const [error, names] = attempt<string[], Error>(() => ['Alice', 'Bob']);
// names 被推断为 string[] 类型
```

::: warning 不要与异步函数一起使用

此函数不适用于异步函数(返回 `Promise` 的函数)。如果传递异步函数,它将返回 `[null, Promise<T>]`,但即使 Promise 稍后被拒绝,它也无法捕获错误。

对于异步函数,请改用 [`attemptAsync`](./attemptAsync.md) 函数。

```typescript
// 错误用法
const [error, promise] = attempt(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});

// 正确用法
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
```

:::

#### 参数

- `func` (`() => T`):要执行的函数。

#### 返回值

(`[null, T] | [E, null]`):成功时返回 `[null, 结果值]` 元组,发生错误时返回 `[错误, null]` 元组。
