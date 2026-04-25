# wrap (Lodash 兼容性)

::: warning 请使用高阶函数

此 `wrap` 函数只是简单地包装一个函数。在大多数情况下,使用更简单的高阶函数或闭包更清晰。

请改用更快、更现代的闭包或直接函数定义。

:::

创建一个包装给定值或函数的新函数。

```typescript
const wrappedFunc = wrap(value, wrapper);
```

## 用法

### `wrap(value, wrapper)`

当您想对值或函数应用额外的逻辑时,请使用 `wrap`。您可以通过包装函数定义新的行为,该函数将原始值作为第一个参数接收。

```typescript
import { wrap } from 'es-toolkit/compat';

// 包装函数以添加日志功能
const greet = (name: string) => `Hi, ${name}`;
const loggedGreet = wrap(greet, (originalFunc, name) => {
  const result = originalFunc(name);
  console.log(`[LOG] ${result}`);
  return result;
});

loggedGreet('Alice'); // 在控制台输出 "[LOG] Hi, Alice" 并返回 "Hi, Alice"
```

您也可以包装非函数值。该值将作为第一个参数传递给包装函数。

```typescript
import { wrap } from 'es-toolkit/compat';

// 创建一个将字符串包装在 HTML 标签中的函数
const htmlWrapper = wrap('Hello World', (text, tag) => `<${tag}>${text}</${tag}>`);
console.log(htmlWrapper('h1')); // "<h1>Hello World</h1>"

// 创建一个在计算中使用数字的函数
const calculate = wrap(10, (baseValue, multiplier) => baseValue * multiplier);
console.log(calculate(5)); // 50
```

这是一个更复杂的函数包装示例。

```typescript
import { wrap } from 'es-toolkit/compat';

const add = (a: number, b: number) => a + b;

// 创建一个带有性能测量的函数
const timedAdd = wrap(add, (originalAdd, a, b) => {
  const start = Date.now();
  const result = originalAdd(a, b);
  const end = Date.now();
  console.log(`执行时间: ${end - start}ms`);
  return result;
});

timedAdd(3, 7); // 在控制台输出执行时间并返回 10
```

#### 参数

- `value` (`T`): 要包装的值或函数。
- `wrapper` (`(value: T, ...args: U[]) => V`): 接收原始值作为第一个参数并应用额外逻辑的函数。

#### 返回值

(`(...args: U[]) => V`): 返回应用了包装函数的新函数。
