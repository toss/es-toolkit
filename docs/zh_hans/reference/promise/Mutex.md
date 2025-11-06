# Mutex

确保多个异步任务不会同时执行,保持执行顺序。

```typescript
const mutex = new Mutex();
```

## 用法

### `Mutex()`

当您想要防止多个异步任务同时执行时,可以使用 `Mutex`。在需要控制并发的情况下很有用,例如数据库连接、文件系统访问、API 调用限制等。

```typescript
import { Mutex } from 'es-toolkit';

const mutex = new Mutex();

// API 调用限制示例
async function callAPI() {
  await mutex.acquire();
  try {
    // 防止多个 API 调用同时发生
    const response = await fetch('/api/data');
    return response.json();
  } finally {
    mutex.release();
  }
}

// 文件系统访问示例
async function writeToFile(data: string) {
  await mutex.acquire();
  try {
    // 防止同时对同一文件进行写入操作
    await fs.writeFile('data.txt', data);
    console.log('文件写入完成');
  } finally {
    mutex.release();
  }
}

// 即使同时调用多个任务,也会按顺序执行
callAPI();
callAPI(); // 等待第一个任务完成
writeToFile(); // 等待前面的任务完成
```

#### 属性

- `isLocked` (`boolean`): 当前互斥锁是否正在使用中。如果为 `true`,表示已有异步任务正在执行。

#### 方法

- `acquire` (`() => Promise<void>`): 获取许可并执行异步任务,或等待直到获得许可。
- `release` (`() => void`): 释放锁,使等待中的下一个任务可以执行。
