# delay (Lodash 兼容性)

::: warning 请使用 `setTimeout`

这个 `delay` 函数只是 `setTimeout` 的简单包装器，但由于额外的类型验证和数字转换会产生轻微的开销。

请直接使用更快且标准的 `setTimeout`。

:::

设置一个定时器，在指定时间后执行函数。

```typescript
const timerId = delay(func, wait, ...args);
```

## 参考

### `delay(func, wait, ...args)`

当您想要将函数执行延迟特定时间时，请使用 `delay`。它对于动画定时、延迟用户反馈或调度异步操作很有用。

```typescript
import { delay } from 'es-toolkit/compat';

// 基本用法
const timerId = delay(() => {
  console.log('1秒后执行');
}, 1000);

// 带参数使用
delay(
  (name, age) => {
    console.log(`你好，${age}岁的${name}！`);
  },
  2000,
  '张三',
  30
);
// 2秒后：打印 "你好，30岁的张三！"
```

与 `setTimeout` 比较：

```typescript
// 使用 delay
import { delay } from 'es-toolkit/compat';

const timerId1 = delay(myFunction, 1000, 'arg1', 'arg2');

// 使用 setTimeout（更快，标准）
const timerId2 = setTimeout(myFunction, 1000, 'arg1', 'arg2');

// 或使用箭头函数
const timerId3 = setTimeout(() => myFunction('arg1', 'arg2'), 1000);
```

动画序列：

```typescript
import { delay } from 'es-toolkit/compat';

class AnimationSequence {
  constructor(element) {
    this.element = element;
  }

  fadeInSequence() {
    // 立即开始
    this.element.style.opacity = '0';
    this.element.style.display = 'block';

    // 100ms 后开始淡入
    delay(() => {
      this.element.style.transition = 'opacity 500ms ease-in';
      this.element.style.opacity = '1';
    }, 100);

    // 1秒后缩放动画
    delay(() => {
      this.element.style.transform = 'scale(1.1)';
    }, 1000);

    // 1.5秒后恢复原始大小
    delay(() => {
      this.element.style.transform = 'scale(1)';
    }, 1500);
  }
}
```

取消定时器：

```typescript
import { delay } from 'es-toolkit/compat';

class TimerManager {
  constructor() {
    this.timers = new Map();
  }

  setDelayedTask(id, task, delayMs) {
    // 如果存在现有定时器则取消
    this.cancelTask(id);

    const timerId = delay(task, delayMs);
    this.timers.set(id, timerId);

    return timerId;
  }

  cancelTask(id) {
    const timerId = this.timers.get(id);
    if (timerId) {
      clearTimeout(timerId);
      this.timers.delete(id);
      return true;
    }
    return false;
  }

  cancelAllTasks() {
    this.timers.forEach(timerId => clearTimeout(timerId));
    this.timers.clear();
  }
}

const timerManager = new TimerManager();

// 调度任务
timerManager.setDelayedTask(
  'save',
  () => {
    console.log('自动保存');
  },
  5000
);

timerManager.setDelayedTask(
  'cleanup',
  () => {
    console.log('清理完成');
  },
  10000
);

// 必要时取消特定任务
// timerManager.cancelTask('save');

// 页面卸载时清理所有定时器
window.addEventListener('beforeunload', () => {
  timerManager.cancelAllTasks();
});
```

#### 参数

- `func` (`Function`): 延迟后要执行的函数。
- `wait` (`number`): 要延迟的毫秒数。
- `args` (`...any[]`): 执行函数时要传递的参数。

#### 返回值

(`number`): 返回定时器 ID。可以使用 `clearTimeout()` 取消。
