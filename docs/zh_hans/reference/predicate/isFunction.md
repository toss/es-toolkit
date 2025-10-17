# isFunction

检查给定值是否为函数。

```typescript
const result = isFunction(value);
```

## 参考

### `isFunction(value)`

当您想确认某个值是否为函数时，请使用 `isFunction`。可以检测一般函数、异步函数、生成器函数、构造函数等所有类型的函数。

```typescript
import { isFunction } from 'es-toolkit/predicate';

// 一般函数
console.log(isFunction(function() {})); // true
console.log(isFunction(() => {})); // true
console.log(isFunction(Array.prototype.slice)); // true

// 异步函数
console.log(isFunction(async function() {})); // true
console.log(isFunction(async () => {})); // true

// 生成器函数
console.log(isFunction(function* () {})); // true

// 构造函数
console.log(isFunction(Array)); // true
console.log(isFunction(Date)); // true
console.log(isFunction(RegExp)); // true
console.log(isFunction(Promise)); // true
```

也能检测内置 JavaScript 函数和类：

```typescript
// 内置构造函数
console.log(isFunction(Object)); // true
console.log(isFunction(String)); // true
console.log(isFunction(Number)); // true
console.log(isFunction(Boolean)); // true

// 类型数组构造函数
console.log(isFunction(Int8Array)); // true
console.log(isFunction(Uint8Array)); // true
console.log(isFunction(Float32Array)); // true

// Proxy 和 Reflect
console.log(isFunction(Proxy)); // true
console.log(isFunction(Reflect.get)); // true
```

与非函数值区分：

```typescript
// 不是函数的值
console.log(isFunction({})); // false
console.log(isFunction([])); // false
console.log(isFunction('text')); // false
console.log(isFunction(42)); // false
console.log(isFunction(null)); // false
console.log(isFunction(undefined)); // false

// 看起来像函数但不是函数的值
console.log(isFunction({ call: function() {} })); // false
```

在回调函数验证或动态函数调用中很有用：

```typescript
// 回调函数验证
function processData(data: any[], callback?: unknown) {
  const result = data.map(item => item * 2);

  if (isFunction(callback)) {
    // 确定 callback 是函数，可以安全调用
    callback(result);
  }

  return result;
}

// 动态函数执行
function executeIfFunction(fn: unknown, ...args: any[]) {
  if (isFunction(fn)) {
    return fn(...args);
  }

  console.log('给定的值不是函数');
  return null;
}

// 在方法链中检查函数
const utils = {
  data: [1, 2, 3],
  process(fn: unknown) {
    if (isFunction(fn)) {
      this.data = this.data.map(fn);
    }
    return this;
  }
};
```

#### 参数

- `value` (`unknown`): 要检查是否为函数的值。

#### 返回值

(`value is (...args: any[]) => any`): 如果值为函数则返回 `true`，否则返回 `false`。
