# partial

创建一个预先应用部分参数的新函数。

```typescript
const partialFunc = partial(func, arg1, arg2);
```

## 参考

### `partial(func, ...args)`

当您想要预先固定函数的部分参数时,请使用 `partial`。预先提供的参数将放置在函数前面,后续传递的参数将添加到后面。

这是函数式编程中经常使用的柯里化(currying)类似概念。与 `bind` 不同,它不固定 `this` 上下文。

使用 `partial.placeholder` 可以在特定位置的参数稍后传递。

```typescript
import { partial } from 'es-toolkit/function';

// 基本用法
function greet(greeting: string, name: string) {
  return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, 'Hello');
console.log(sayHello('John')); // 'Hello, John!'
console.log(sayHello('Jane')); // 'Hello, Jane!'

// 应用多个参数
function multiply(a: number, b: number, c: number) {
  return a * b * c;
}

const double = partial(multiply, 2);
console.log(double(3, 4)); // 24

const doubleAndTriple = partial(multiply, 2, 3);
console.log(doubleAndTriple(4)); // 24
```

可以使用占位符来调整参数顺序。

```typescript
import { partial } from 'es-toolkit/function';

function subtract(a: number, b: number, c: number) {
  return a - b - c;
}

// 只固定第二个参数,第一个和第三个稍后传递
const subtractFrom5 = partial(subtract, partial.placeholder, 5, partial.placeholder);
console.log(subtractFrom5(10, 2)); // 10 - 5 - 2 = 3

// 与数组方法一起使用
const numbers = [1, 2, 3, 4, 5];
const addTen = partial((x: number, y: number) => x + y, 10);
const result = numbers.map(addTen);
console.log(result); // [11, 12, 13, 14, 15]
```

#### 参数

- `func` (`F`): 要部分应用参数的函数。
- `args` (`any[]`, 可选): 要预先应用的参数。

#### 返回值

(`(...args: any[]) => ReturnType<F>`): 返回一个部分参数已预先应用的新函数。
