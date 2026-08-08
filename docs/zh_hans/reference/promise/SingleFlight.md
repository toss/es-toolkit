# SingleFlight

确保同一时间只有一个异步任务在执行，并将该任务的 Promise 共享给重复调用者。

```typescript
const flight = new SingleFlight();
```

## 用法

### `SingleFlight()`

当多个调用者可能同时启动相同操作，但实际只应执行一次时，可以使用 `SingleFlight`。

```typescript
import { SingleFlight } from 'es-toolkit';

const flight = new SingleFlight();

const first = flight.run(async () => {
  const response = await fetch('/api/config');
  return response.json();
});

const second = flight.run(async () => {
  const response = await fetch('/api/config');
  return response.json();
});

console.log(first === second); // true
```

无论任务成功还是失败，调用者都会共享同一个 Promise。任务结束后不会缓存结果，下一次调用会启动新任务。

#### 方法

- `run`（`(task: () => Promise<T>) => Promise<T>`）：执行任务，或返回当前正在执行的任务的 Promise。
