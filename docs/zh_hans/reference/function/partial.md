# partial

创建一个函数，该函数会在调用时将 `partialArgs` 作为前置参数传递给 `func`。

此方法类似于 [bind](../compat/function/bind.md)，但不会改变 `this` 绑定。

`partial.placeholder` 的值默认是一个 `symbol`，可以用作附加的部分参数的占位符。

**注意：** 这个方法不会设置部分应用函数的 `length` 属性。

## 签名

```typescript
function partial<F extends Function>(func: F, ...partialArgs: any[]): (...args: any[]) => ReturnType<F>;

namespace partial {
  placeholder: symbol;
}
```

### 参数

- `func` (`F`): 要部分应用的原始函数。
- `partialArgs` (`any[]`, 可选): 附加的部分参数。

### 返回值

(`(...args: any[]) => ReturnType<F>`): 返回新的部分应用函数。

## 示例

```typescript
import { partial } from 'es-toolkit/function';

function greet(greeting, name) {
  return greeting + ' ' + name;
}

const sayHelloTo = partial(greet, 'hello');
sayHelloTo('fred');
// => 'hello fred'

// Partially applied with placeholders.
const greetFred = partial(greet, partial.placeholder, 'fred');
greetFred('hi');
// => 'hi fred'
```
