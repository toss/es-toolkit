# now (Lodash 兼容性)

::: warning 使用 `Date.now()`
这个 `now` 函数是一个简单调用 `Date.now()` 的包装函数，是不必要的抽象。

请使用更快速、更直接的 `Date.now()`。
:::

返回当前时间的毫秒数。

```typescript
const currentTime = now();
```

## 用法

### `now()`

返回自1970年1月1日00:00:00 UTC以来经过的毫秒数。对时间测量或时间戳生成很有用。

```typescript
import { now } from 'es-toolkit/compat';

// 获取当前时间
const currentTime = now();
console.log(currentTime); // => 1703925600000（示例）

// 测量执行时间
const startTime = now();
// 耗时操作
const endTime = now();
console.log(`操作时间：${endTime - startTime}ms`);

// 用作时间戳
const timestamp = now();
const logMessage = `[${timestamp}] 操作完成`;
```

返回与 `Date.now()` 相同的结果。

```typescript
import { now } from 'es-toolkit/compat';

console.log(now() === Date.now()); // => true（在同一时间调用时）
```

#### 参数

无参数。

#### 返回值

(`number`): 返回自1970年1月1日00:00:00 UTC以来到现在的毫秒数。
