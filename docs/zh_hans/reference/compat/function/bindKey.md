# bindKey

::: info
出于兼容性原因，此函数仅在 `es-toolkit/compat` 中提供。它可能具有替代的原生 JavaScript API，或者尚未完全优化。

从 `es-toolkit/compat` 导入时，它的行为与 lodash 完全一致，并提供相同的功能，详情请见 [这里](../../../compatibility.md)。

:::

创建一个函数，该函数调用 `object[key]` 上的方法，并将 `partialArgs` 作为其接收的参数的前置参数。

此方法与 [`bind`](./bind.md) 不同，它允许绑定的函数引用可能被重新定义或尚不存在的方法。

`bindKey.placeholder` 的值默认是一个 `symbol`，可以用作附加的部分参数的占位符。

## 签名

```typescript
function bindKey<T extends Record<PropertyKey, any>, K extends keyof T>(
  object: T,
  key: K,
  ...partialArgs: any[]
): T[K] extends (...args: any[]) => any ? (...args: any[]) => ReturnType<T[K]> : never;

namespace bindKey {
  placeholder: symbol;
}
```

### 参数

- `object` (`T`): 需要绑定并调用方法的对象。
- `key` (`K`): 要绑定的方法的键。
- `partialArgs` (`any[]`): 要部分应用的参数。

### 返回值

(`T[K] extends (...args: any[]) => any ? (...args: any[]) => ReturnType<T[K]> : never`): 返回新的绑定函数。

## 示例

```typescript
import { bindKey } from 'es-toolkit/function';

const object = {
  user: 'fred',
  greet: function (greeting, punctuation) {
    return greeting + ' ' + this.user + punctuation;
  },
};

let bound = bindKey(object, 'greet', 'hi');
bound('!');
// => 'hi fred!'

object.greet = function (greeting, punctuation) {
  return greeting + 'ya ' + this.user + punctuation;
};

bound('!');
// => 'hiya fred!'

// 使用 placeholders 绑定
bound = bindKey(object, 'greet', bindKey.placeholder, '!');
bound('hi');
// => 'hiya fred!'
```
