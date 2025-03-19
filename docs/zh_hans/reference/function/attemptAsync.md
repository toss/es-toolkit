# attemptAsync

尝试执行异步函数并返回包含结果或错误的元组。

## 签名

```typescript
function attemptAsync<AttemptResult, AttemptError>(
  func: () => Promise<AttemptResult>
): Promise<[null, AttemptResult] | [AttemptError, null]>;
```

### 参数

- `func` (`() => Promise<AttemptResult>`): 尝试执行的异步函数。

### 返回

(`Promise<[null, AttemptResult] | [AttemptError, null]>`): 解析为以下元组的`Promise`:

- 成功时: `[null, AttemptResult]` - 第一个元素为`null`，第二个为结果
- 出错时: `[AttemptError, null]` - 第一个元素为捕获的错误，第二个为`null`

## 示例

```typescript
import { attemptAsync } from 'es-toolkit/function';

// 成功执行
const [error, data] = await attemptAsync(async () => {
  const response = await fetch('https://api.example.com/data');
  return response.json();
});
// 成功时: [null, { ... data ... }]

// 执行失败
const [error, data] = await attemptAsync(async () => {
  throw new Error('网络错误');
});
// [Error, null]

// 使用类型参数
const [error, users] = await attemptAsync<User[]>(async () => {
  const response = await fetch('https://api.example.com/users');
  return response.json();
});
// users的类型为User[]
```
