# partialRight

创建一个函数，该函数在接收到参数时将 `partialArgs` 追加到这些参数上，并调用 `func`。

此方法类似于 [partial](./partial.md)，但部分应用的参数会被附加到接收到的参数之后。

`partialRight.placeholder` 的值默认是一个 `symbol`，可以用作附加的部分参数的占位符。

**注意：** 这个方法不会设置部分应用函数的 `length` 属性。

## 签名

```typescript
function partialRight<F extends Function>(func: F, ...partialArgs: any[]): F;

namespace partialRight {
  placeholder: symbol;
}
```

### 参数

- `func` (`F`): 要部分应用的原始函数。
- `partialArgs` (`any[]`, 可选): 附加的部分参数。

### 返回值

(`F`): 返回新的部分应用函数。

## 示例

```typescript
import { partialRight } from 'es-toolkit/function';

function greet(greeting, name) {
  return greeting + ' ' + name;
}

const greetFred = partialRight(greet, 'fred');
greetFred('hi');
// => 'hi fred'

// Partially applied with placeholders.
const sayHelloTo = partialRight(greet, 'hello', partialRight.placeholder);
sayHelloTo('fred');
// => 'hello fred'
```
