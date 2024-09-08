# attempt

尝试调用 `func` ，返回结果或者捕捉错误对象。任何附加的参数都会在调用时传给 `func`。

## 签名

```typescript
function attempt<F extends (...args: any[]) => any>(func: F, ...args: Parameters<F>): ReturnType<F> | Error;
```

### 参数

- `func` (`F`): 要尝试调用的函数。
- `args` (`Parameters<F>`): 调用 `func` 时，传递的参数。

### 返回值

(`ReturnType<F>` | `Error`): `func` 结果或者错误对象。

## 示例

```typescript
import { attempt } from 'es-toolkit/function';

// Avoid throwing errors for invalid selectors.
let elements = attempt(function (selector) {
  return document.querySelectorAll(selector);
}, '>_>');

if (elements instanceof Error) {
  elements = [];
}
```
