# Semaphore

信号量可以用来限制同时执行的异步任务的数量。

- 执行 `acquire` 方法时，会获取许可并执行异步任务，或者等待直到获得许可。
- 执行 `release` 方法时，会允许下一个等待中的任务执行。

此信号量按照 `acquire` 执行的顺序，先到先得地执行异步任务。

## 签名

```typescript
class Semaphore {
  public capacity: number;
  public available: number;

  constructor(capacity: number);

  acquire(): Promise<void>;
  release(): void;
}
```

## 属性

- `capacity` (`number`): 同时可以执行的最大任务数。
- `available` (`number`): 当前剩余的可执行任务数。

## 方法

- `acquire` (`() => Promise<void>`): 获取许可并执行异步任务，或者等待直到获得许可。
- `release` (`() => void`): 允许下一个等待中的任务执行。

## 示例

```typescript
const sema = new Semaphore(2);

async function task() {
  await sema.acquire();
  try {
    // This code can only be executed by two tasks at the same time
  } finally {
    sema.release();
  }
}

task();
task();
task(); // This task will wait until one of the previous tasks releases the semaphore.
```
