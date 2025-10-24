# attemptAsync

执行异步函数并将结果或错误作为元组返回。

```typescript
const [error, result] = await attemptAsync(func);
```

## 参考

### `attemptAsync(func)`

当您想要安全地执行异步函数时,请使用 `attemptAsync`。您可以在不用 try-catch 包装 async/await 块的情况下处理错误。

```typescript
import { attemptAsync } from 'es-toolkit/util';

// API 请求成功的情况
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
// error 为 null,data 包含响应数据

// 发生网络错误的情况
const [error, data] = await attemptAsync(async () => {
  throw new Error('网络错误');
});
// error 为 Error 对象,data 为 null

// 您也可以指定类型
interface User {
  id: number;
  name: string;
}

const [error, users] = await attemptAsync<User[]>(async () => {
  const response = await fetch('https://api.example.com/users');
  return response.json();
});
// users 被推断为 User[] 类型
```

在需要错误处理的异步操作(如数据库查询或文件读取)中特别有用。

```typescript
// 文件读取示例
const [error, content] = await attemptAsync(async () => {
  const fs = await import('fs/promises');
  return fs.readFile('config.json', 'utf8');
});

if (error) {
  console.log('无法读取文件:', error.message);
} else {
  console.log('文件内容:', content);
}
```

::: info 对于同步函数请使用 attempt

此函数适用于处理异步函数(返回 `Promise` 的函数)。如果要处理同步函数,建议使用 [`attempt`](./attempt.md) 函数。

:::

#### 参数

- `func` (`() => Promise<T>`): 要执行的异步函数。

#### 返回值

(`Promise<[null, T] | [E, null]>`): 返回一个 Promise,成功时解析为 `[null, 结果值]`,发生错误时解析为 `[错误, null]`。
