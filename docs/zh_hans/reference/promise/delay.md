# delay

延迟执行代码指定的毫秒数。

该函数返回一个 Promise，在指定的延迟后解析，可以与 async/await 结合使用来暂停执行。

它还支持一个可选的 AbortSignal 来取消延迟。

## 签名

```typescript
function delay(ms: number, options?: DelayOptions): Promise<void>;
```

### 参数

- `ms` (`number`): 要延迟的毫秒数。
- `options` (`DelayOptions`, 可选): 一个选项对象。
  - `signal` (`AbortSignal`, 可选): 用于取消延迟的可选 `AbortSignal`。

### 返回值

(`Promise<void>`): 在指定延迟后解析的 Promise。

## 示例

### 基本用法

```typescript
async function foo() {
  console.log('Start');
  await delay(1000); // 延迟执行 1 秒钟
  console.log('End');
}

foo();
```

### 使用 AbortSignal

```typescript
async function foo() {
  const controller = new AbortController();
  const signal = controller.signal;

  setTimeout(() => controller.abort(), 50); // 在 50 毫秒后取消延迟
  try {
    await delay(1000, { signal });
  } catch (error) {
    console.log(error); // 将会输出 'The operation was aborted'
  }
}
```

## Lodash 兼容性

从 `es-toolkit/compat` 导入 `delay` 以获得与 Lodash 的完全兼容性。

- `delay` 接受一个在延迟后调用的函数。
- `delay` 接受将传递给该函数的参数。
- `delay` 返回一个可以用来清除超时的定时器 ID。

```typescript
import { delay } from 'es-toolkit/compat';

// 示例 1: 延迟函数执行
const timerId = delay(
  (greeting, recipient) => {
    console.log(`${greeting}, ${recipient}!`);
  },
  1000,
  '你好',
  '小明'
);
// => 1秒后将日志打印 '你好, 小明!'

// 示例 2: 在执行之前清除超时
clearTimeout(timerId);
// 因为超时已清除，函数不会被执行。
```
