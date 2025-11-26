# isPromise

检查给定值是否为 `Promise` 实例。

```typescript
const result = isPromise(value);
```

## 用法

### `isPromise(value)`

当您想检查值是否为 `Promise` 实例时，请使用 `isPromise`。在异步代码中需要区分 `Promise` 对象和其他值，或需要有条件地使用 `await` 时非常有用。

```typescript
import { isPromise } from 'es-toolkit/predicate';

// Promise 实例
const promise1 = new Promise(resolve => resolve('done'));
const promise2 = Promise.resolve(42);
const promise3 = Promise.reject(new Error('failed'));

console.log(isPromise(promise1)); // true
console.log(isPromise(promise2)); // true
console.log(isPromise(promise3)); // true

// 非 Promise 值
console.log(isPromise({})); // false
console.log(isPromise('hello')); // false
console.log(isPromise(42)); // false
console.log(isPromise(null)); // false
console.log(isPromise(undefined)); // false
```

在异步函数中根据条件执行逻辑时非常有用。

```typescript
// 检查值是否为 Promise 并适当处理
async function processValue(input: unknown) {
  if (isPromise(input)) {
    // TypeScript 将 input 推断为 Promise<any>
    const result = await input;
    console.log('Promise 结果:', result);
    return result;
  }

  // 非 Promise 值直接返回
  console.log('普通值:', input);
  return input;
}

// API 响应处理
function handleApiCall(response: unknown) {
  if (isPromise(response)) {
    return response.then(data => ({ success: true, data })).catch(error => ({ success: false, error: error.message }));
  }

  // 已解决的值
  return { success: true, data: response };
}

// 在工具函数中使用
function toPromise<T>(value: T | Promise<T>): Promise<T> {
  if (isPromise(value)) {
    return value;
  }

  return Promise.resolve(value);
}
```

可以区分类似 Promise 的对象和真正的 `Promise`。

```typescript
// thenable 对象不是 Promise
const thenable = {
  then: (resolve: Function) => resolve('not a promise'),
};

console.log(isPromise(thenable)); // false

// async 函数结果是 Promise
async function asyncFunction() {
  return 'async result';
}

console.log(isPromise(asyncFunction())); // true

// 普通函数不是 Promise
function normalFunction() {
  return 'normal result';
}

console.log(isPromise(normalFunction())); // false
```

也可以用于错误处理。

```typescript
function safeExecute(fn: () => any) {
  try {
    const result = fn();

    if (isPromise(result)) {
      return result.catch(error => {
        console.error('异步函数执行中出错:', error);
        return null;
      });
    }

    return result;
  } catch (error) {
    console.error('同步函数执行中出错:', error);
    return null;
  }
}

// 超时处理
function withTimeout<T>(valueOrPromise: T | Promise<T>, timeoutMs: number) {
  if (!isPromise(valueOrPromise)) {
    return valueOrPromise;
  }

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), timeoutMs);
  });

  return Promise.race([valueOrPromise, timeoutPromise]);
}
```

#### 参数

- `value` (`unknown`): 要检查是否为 Promise 实例的值。

#### 返回值

(`boolean`): 如果值是 Promise 实例，则返回 `true`，否则返回 `false`。
