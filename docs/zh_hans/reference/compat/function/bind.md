# bind

::: info
此函数与 lodash 完全兼容。您可以在我们的[兼容性库](../../../compatibility.md)中找到它，`es-toolkit/compat`。
:::

创建一个调用 `func` 的函数，`thisObj` 绑定 `func` 函数中的 `this`，并且 `func` 函数会接收 `partialArgs` 附加参数。

`bind.placeholder` 的值默认是一个 `symbol`，可以用作附加的部分参数的占位符。

**注意：** 不同于原生的 `Function#bind`，这个方法不会设置绑定函数的 `length` 属性。

## 签名

```typescript
function bind<F extends Function>(func: F, thisObj?: unknown, ...partialArgs: any[]): F;

namespace bind {
  placeholder: symbol;
}
```

### 参数

- `fn` (`F`): 绑定的函数。
- `thisObj` (`any`, optional): `func` 绑定的 `this` 对象。
- `partialArgs` (`any[]`): 附加的部分参数。

### Returns

(`F`): 返回新的绑定函数。

## 示例

```typescript
import { bind } from 'es-toolkit/compat';

function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}

const object = { user: 'fred' };

let bound = bind(greet, object, 'hi');
bound('!');
// => 'hi fred!'

// Bound with placeholders.
bound = bind(greet, object, bind.placeholder, '!');
bound('hi');
// => 'hi fred!'
```
