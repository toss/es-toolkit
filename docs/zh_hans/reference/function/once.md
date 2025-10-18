# once

创建一个限制函数只执行一次的新函数。

```typescript
const onceFunc = once(func);
```

## 参考

### `once(func)`

当您想要限制函数只执行一次时,请使用 `once`。后续调用将返回第一次调用的结果。

这对于初始化函数或事件处理程序等只需执行一次的逻辑很有用。防止重复执行并保证结果一致。

```typescript
import { once } from 'es-toolkit/function';

// 初始化函数示例
const initialize = once(() => {
  console.log('初始化应用');
  return { status: 'initialized' };
});

console.log(initialize()); // 输出 '初始化应用' 日志,返回 { status: 'initialized' }
console.log(initialize()); // 无日志,返回 { status: 'initialized' }
console.log(initialize()); // 无日志,返回 { status: 'initialized' }

// API 调用示例
const fetchConfig = once(async () => {
  console.log('获取配置');
  const response = await fetch('/api/config');
  return response.json();
});

// 只有在第一次调用时才执行实际的 API 请求
const config1 = await fetchConfig();
const config2 = await fetchConfig(); // 返回缓存的结果
```

也可以使用带参数的函数。

```typescript
import { once } from 'es-toolkit/function';

const logOnce = once((message: string) => {
  console.log(`重要消息: ${message}`);
});

logOnce('你好'); // 输出 '重要消息: 你好'
logOnce('再次你好'); // 不输出 (已经调用过)
logOnce('又是你好'); // 不输出 (已经调用过)
```

#### 参数

- `func` (`F`): 要限制为只调用一次的函数。

#### 返回值

(`F`): 返回一个在第一次调用后缓存结果并在后续调用中返回相同结果的新函数。
