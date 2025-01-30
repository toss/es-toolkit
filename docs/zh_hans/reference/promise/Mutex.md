# Mutex

互斥锁（Mutex）用于确保异步任务在特定代码区域内一次只能执行一个。

## 签名

```typescript
class Mutex {
  isLocked: boolean;

  acquire(): Promise<void>;
  release(): void;
}
```

## 属性

- `isLocked` (`boolean`): 当前互斥锁是否被使用。`true` 表示已经有正在执行的异步任务。

## 方法

- `acquire` (`() => Promise<void>`): 获取互斥锁，执行异步任务，或者等待获取互斥锁。
- `release` (`() => void`): 释放互斥锁，允许下一个等待的任务执行。

## 示例

```typescript
const mutex = new Mutex();

async function criticalSection() {
  await mutex.acquire();
  try {
    // This code section cannot be executed simultaneously
  } finally {
    mutex.release();
  }
}

criticalSection();
criticalSection(); // This call will wait until the first call releases the mutex.
```
