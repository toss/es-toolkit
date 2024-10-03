# once

创建一个函数，限制只能调用提供的函数 `func` 一次。

对该函数的重复调用会返回第一次调用时的结果。

## 签名

```typescript
function once<F extends () => any>(func: F): F;
function once<F extends (...args: any[]) => void>(func: F): F;
```

### 参数

- `func` (`F extends (() => any) | ((...args: any[]) => void)`): 要限制的函数。

### 返回值

(`F`): 调用 `func` 一次并缓存结果的新函数。

## 示例

```typescript
const initialize = once(() => {
  console.log('Initialized!');
  return true;
});

initialize(); // 输出：'Initialized!' 并返回 true
initialize(); // 返回 true，但不会再输出
```
