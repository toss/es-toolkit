# KeyedSingleFlight

确保每个 key 同时只有一个异步任务在执行，并将该任务的 Promise 共享给相同 key 的重复调用者。

```typescript
const flight = new KeyedSingleFlight<string>();
```

## 用法

### `KeyedSingleFlight<K>()`

当需要按 key 消除重复任务，同时允许不同 key 的任务并行执行时，可以使用 `KeyedSingleFlight`。

```typescript
import { KeyedSingleFlight } from 'es-toolkit';

const flight = new KeyedSingleFlight<string>();

const first = flight.run('user:1', async () => {
  const response = await fetch('/api/users/1');
  return response.json();
});

const second = flight.run('user:1', async () => {
  const response = await fetch('/api/users/1');
  return response.json();
});

const other = flight.run('user:2', async () => {
  const response = await fetch('/api/users/2');
  return response.json();
});

console.log(first === second); // true
console.log(first === other); // false
```

无论任务成功还是失败，相同 key 的调用者都会共享同一个 Promise。任务结束后不会缓存结果，相同 key 的下一次调用会启动新任务。key 使用 `Map` 的比较规则，因此对象 key 按引用进行比较。

#### 参数

- `K`（`unknown`）：用于标识任务的 key 类型。

#### 方法

- `run`（`(key: K, task: () => Promise<T>) => Promise<T>`）：执行任务，或返回该 key 当前正在执行的任务的 Promise。
