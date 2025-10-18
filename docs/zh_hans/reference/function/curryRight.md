# curryRight

从右到左对函数进行柯里化,使其可以一次接收一个参数进行调用。

```typescript
const curriedFunc = curryRight(func);
```

## 参考

### `curryRight(func)`

当您想要从右到左部分应用函数时,请使用 `curryRight`。与普通的 `curry` 不同,它从最后一个参数开始接收。

```typescript
import { curryRight } from 'es-toolkit/function';

function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curryRight(sum);

// 为参数 `c` 提供值 `10`
const add10 = curriedSum(10);

// 为参数 `b` 提供值 `15`
const add25 = add10(15);

// 为参数 `a` 提供值 `5`
// 已收到所有参数,现在返回值
const result = add25(5);
// Returns: 30
```

这在从右到左应用参数更自然的情况下很有用。

```typescript
function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const curriedGreet = curryRight(greet);
const greetJohn = curriedGreet('John');

greetJohn('Hello'); // Returns: 'Hello, John!'
greetJohn('Hi'); // Returns: 'Hi, John!'
```

#### 参数

- `func` (`(...args: any[]) => any`): 要柯里化的函数。

#### 返回值

(`(...args: any[]) => any`): 可以从右到左一次接收一个参数进行调用的柯里化函数。
