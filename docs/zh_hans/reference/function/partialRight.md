# partialRight

创建一个从后面开始预先应用部分参数的新函数。

```typescript
const partialRightFunc = partialRight(func, arg1, arg2);
```

## 参考

### `partialRight(func, ...args)`

当您想要从后面开始固定函数的部分参数时,请使用 `partialRight`。与 `partial` 相反,预先提供的参数将放置在函数后面,后续传递的参数将添加到前面。

这在想要固定函数的最后参数并只动态更改前面参数时很有用。

使用 `partialRight.placeholder` 可以在特定位置的参数稍后传递。

```typescript
import { partialRight } from 'es-toolkit/function';

// 基本用法
function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const greetJohn = partialRight(greet, 'John');
console.log(greetJohn('Hello')); // 'Hello, John!'
console.log(greetJohn('Hi')); // 'Hi, John!'

// 应用多个参数
function subtract(a: number, b: number, c: number) {
  return a - b - c;
}

const subtractFrom10And5 = partialRight(subtract, 5, 2);
console.log(subtractFrom10And5(10)); // 10 - 5 - 2 = 3

// 在数学运算中应用常量
function divide(dividend: number, divisor: number) {
  return dividend / divisor;
}

const divideBy2 = partialRight(divide, 2);
console.log(divideBy2(10)); // 10 / 2 = 5
console.log(divideBy2(20)); // 20 / 2 = 10
```

可以使用占位符来调整参数顺序。

```typescript
import { partialRight } from 'es-toolkit/function';

function formatMessage(level: string, message: string, timestamp: string) {
  return `[${level}] ${message} at ${timestamp}`;
}

// 只固定最后一个参数,其余稍后传递
const logWithTime = partialRight(formatMessage, partialRight.placeholder, '2023-01-01');
console.log(logWithTime('INFO', 'Application started'));
// '[INFO] Application started at 2023-01-01'

// 与数组一起使用
const numbers = [1, 2, 3, 4, 5];
const appendSuffix = partialRight((num: number, suffix: string) => `${num}${suffix}`, 'th');
const result = numbers.map(appendSuffix);
console.log(result); // ['1th', '2th', '3th', '4th', '5th']
```

#### 参数

- `func` (`F`): 要部分应用参数的函数。
- `args` (`any[]`, 可选): 从后面开始预先应用的参数。

#### 返回值

(`(...args: any[]) => ReturnType<F>`): 返回一个部分参数已从后面开始预先应用的新函数。
