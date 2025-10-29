# partialRight (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `partialRight`

这个 `partialRight` 函数由于许多重载和联合类型处理而效率低下。此外,在大多数情况下可以用更简单的箭头函数替代。

建议使用更快且更现代的 `es-toolkit` 的 [`partialRight`](../../function/partialRight.md)。

:::

通过从右侧预填充参数来创建部分应用的函数。

```typescript
const partialFunc = partialRight(func, ...args);
```

## 参考

### `partialRight(func, ...args)`

当您想通过从右侧预填充参数来创建部分应用的函数时,使用 `partialRight`。主要在参数顺序重要的函数中固定最后的参数时很有用。

```typescript
import { partialRight } from 'es-toolkit/compat';

// 基本用法
function greet(greeting, name, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

// 预设最后一个参数
const greetWithExclamation = partialRight(greet, '!');
greetWithExclamation('Hello', 'Alice'); // 'Hello Alice!'

// 预设多个参数
const sayHiToAlice = partialRight(greet, 'Alice', '!');
sayHiToAlice('Hi'); // 'Hi Alice!'

// 使用 placeholder 控制参数顺序
const greetAliceWithCustom = partialRight(greet, 'Alice', partialRight.placeholder);
greetAliceWithCustom('Hello', '?'); // 'Hello Alice?'
```

在大多数情况下可以用箭头函数替代:

```typescript
// 使用箭头函数代替 partialRight(推荐)
const greetWithExclamation = (greeting, name) => greet(greeting, name, '!');
const sayHiToAlice = greeting => greet(greeting, 'Alice', '!');
```

#### 参数

- `func` (`Function`): 要部分应用的函数。
- `...args` (`any[]`): 要预填充的参数。使用 `partialRight.placeholder` 可以控制参数顺序。

#### 返回值

(`Function`): 返回一个从右侧预填充了参数的新函数。
