# attemptAsync

::: info
此函数专为处理异步函数（返回`Promise`的函数）而设计。
对于同步函数，建议使用`attempt`函数代替。
:::

尝试执行异步函数并返回包含结果或错误的元组。

## 签名

```typescript
function attemptAsync<T, E>(func: () => Promise<T>): Promise<[null, T] | [E, null]>;
```

### 参数

- `func` (`() => Promise<T>`): 尝试执行的异步函数。

### 返回值

(`Promise<[null, T] | [E, null]>`): 解析为以下元组的`Promise`:

- 成功时: `[null, T]` - 第一个元素为`null`，第二个为结果。
- 出错时: `[E, null]` - 第一个元素为捕获的错误，第二个为`null`。

## 示例

```typescript
import { attemptAsync } from 'es-toolkit/function';

// 成功时返回 [null, 函数返回值] 元组。
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
// [null, 响应对象]

// 出错时返回 [函数抛出的错误, null] 元组。
const [error, data] = await attemptAsync(async () => {
  throw new Error('网络错误');
});
// [Error, null]

// 使用泛型类型可以指定错误和返回值的类型。
const [error, users] = await attemptAsync<User[], Error>(async () => {
  const response = await fetch('https://api.example.com/users');
  return response.json();
});
// `error` 被推断为 `Error` 类型，`users` 被推断为 `User[]` 类型。
```
