# after (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [`after`](../../function/after.md)

由于复杂的类型验证和整数转换处理,此 `after` 函数运行缓慢。

请改用更快、更现代的 `es-toolkit` 的 [after](../../function/after.md)。

:::

创建一个只在被调用指定次数后才执行的函数。

```typescript
const restrictedFunction = after(n, func);
```

## 参考

### `after(n, func)`

当您想限制函数仅在被调用特定次数后才执行时,请使用 `after`。它在多个异步操作完成后执行回调,或在初始化阶段后激活函数时非常有用。

```typescript
import { after } from 'es-toolkit/compat';

// 基本用法
const logAfterThree = after(3, () => {
  console.log('从第3次调用开始执行!');
});

logAfterThree(); // 不执行
logAfterThree(); // 不执行
logAfterThree(); // 输出 "从第3次调用开始执行!"
logAfterThree(); // 输出 "从第3次调用开始执行!" (继续执行)
```

您还可以使用它在所有异步操作完成后执行特定回调。

```typescript
import { after } from 'es-toolkit/compat';

const tasks = ['task1', 'task2', 'task3'];
const allTasksComplete = after(tasks.length, () => {
  console.log('所有任务已完成!');
});

// 每个任务完成时调用
tasks.forEach(task => {
  performAsyncTask(task, () => {
    console.log(`${task} 完成`);
    allTasksComplete(); // 第3次调用时输出 "所有任务已完成!"
  });
});
```

当传递0或负数时,从第一次调用开始立即执行。

```typescript
import { after } from 'es-toolkit/compat';

const immediate = after(0, () => console.log('立即执行'));
immediate(); // "立即执行"

const negative = after(-1, () => console.log('立即执行'));
negative(); // "立即执行"
```

#### 参数

- `n` (`number`): 函数执行前所需的调用次数。
- `func` (`TFunc`): 要限制的函数。

#### 返回值

(`TFunc`): 返回一个新的受限函数,从第 n 次调用开始执行原始函数。
