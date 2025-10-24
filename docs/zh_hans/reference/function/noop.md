# noop

什么都不做的空函数。

```typescript
noop();
```

::: info [`asyncNoop`](./asyncNoop.md) 函数

如果需要异步地什么都不做的函数,请使用直接返回 `Promise<void>` 的 `asyncNoop` 函数。

:::

## 参考

### `noop()`

当需要不执行任何操作的函数时,请使用 `noop`。

这在函数是必需的地方用作默认值,或当您想要禁用回调函数时很有用。经常用作占位符或在初始化阶段使用。

```typescript
import { noop } from 'es-toolkit/function';

// 用作可选回调的默认值
interface EventHandlers {
  onSuccess?: () => void;
  onError?: () => void;
}

function processData({ onSuccess = noop, onError = noop }: EventHandlers = {}) {
  try {
    // 数据处理逻辑
    console.log('数据处理完成');
    onSuccess(); // 可以安全调用
  } catch (error) {
    onError(); // 可以安全调用
  }
}

// 无需 undefined 检查即可安全使用
processData({
  onSuccess: () => console.log('成功!'),
  // onError 用 noop 作为默认值处理
});
```

也可以在数组方法中使用。

```typescript
import { noop } from 'es-toolkit/function';

// 有条件地执行函数
const operations = [
  () => console.log('第一个操作'),
  shouldRunSecond ? () => console.log('第二个操作') : noop,
  () => console.log('第三个操作'),
];

operations.forEach(op => op()); // 安全地执行所有操作
```

#### 返回值

(`void`): 不返回任何内容。
