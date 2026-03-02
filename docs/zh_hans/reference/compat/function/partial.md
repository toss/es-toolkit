# partial (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `partial`

这个 `partial` 函数由于许多重载和联合类型处理而效率低下。此外,在大多数情况下可以用更简单的箭头函数替代。

建议使用更快且更现代的 `es-toolkit` 的 [`partial`](../../function/partial.md)。

:::

通过预填充参数来创建部分应用的函数。

```typescript
const partialFunc = partial(func, ...args);
```

## 用法

### `partial(func, ...args)`

当您想通过预填充参数来创建部分应用的函数时,使用 `partial`。主要在参数顺序重要的函数中固定前面的参数时很有用。

```typescript
import { partial } from 'es-toolkit/compat';

// 基本用法
function greet(greeting, name, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

// 预设第一个参数
const sayHello = partial(greet, 'Hello');
sayHello('Alice', '!'); // 'Hello Alice!'

// 预设多个参数
const greetAlice = partial(greet, 'Hello', 'Alice');
greetAlice('!'); // 'Hello Alice!'

// 使用 placeholder 控制参数顺序
const greetWithExclamation = partial(greet, partial.placeholder, 'Alice', '!');
greetWithExclamation('Hi'); // 'Hi Alice!'
```

在大多数情况下可以用箭头函数替代:

```typescript
// 使用箭头函数代替 partial(推荐)
const sayHello = (name, punctuation) => greet('Hello', name, punctuation);
const greetAlice = punctuation => greet('Hello', 'Alice', punctuation);
```

#### 参数

- `func` (`Function`): 要部分应用的函数。
- `...args` (`any[]`): 要预填充的参数。使用 `partial.placeholder` 可以控制参数顺序。

#### 返回值

(`Function`): 返回一个预填充了参数的新函数。
