# isNative (Lodash 兼容性)

检查值是否为 JavaScript 引擎的原生函数。

```typescript
const result = isNative(value);
```

## 参考

### `isNative(value)`

当您想检查给定值是否为 JavaScript 引擎实现的原生函数时使用 `isNative`。可以区分浏览器或 Node.js 提供的内置函数。

```typescript
import { isNative } from 'es-toolkit/compat';

// 原生函数
isNative(Array.prototype.push); // true
isNative(Object.keys); // true
isNative(Math.max); // true
isNative(JSON.parse); // true
isNative(console.log); // true (在浏览器/Node.js 环境中)

// 用户定义函数
isNative(function () {}); // false
isNative(() => {}); // false
isNative(function customFunction() {}); // false

// 库函数
isNative(require('lodash').map); // false
isNative(require('es-toolkit').chunk); // false

// 非函数值
isNative({}); // false
isNative([]); // false
isNative('function'); // false
isNative(123); // false
isNative(null); // false

// 绑定函数
const boundFunction = Array.prototype.push.bind([]);
isNative(boundFunction); // true (绑定函数是原生的)

// 方法
const obj = { method: Array.prototype.push };
isNative(obj.method); // true (仍然是原生函数)
```

#### 参数

- `value` (`any`): 要检查的值。

#### 返回值

(`boolean`): 如果值看起来是原生函数则返回 `true`，否则返回 `false`。
