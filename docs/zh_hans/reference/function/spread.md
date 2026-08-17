# spread

创建一个将参数数组展开为函数的单个参数进行传递的新函数。

```typescript
const spreadFunc = spread(func);
```

## 用法

### `spread(func)`

当您想要将数组形式的参数展开为单个参数传递给函数时,请使用 `spread`。

这与 JavaScript 的展开运算符(`...`)类似,但是通过转换函数使其接收数组的方式。在经常使用 `apply` 方法的情况下很有用。

```typescript
import { spread } from 'es-toolkit/function';

// 基本用法
function add(a: number, b: number) {
  return a + b;
}

const spreadAdd = spread(add);
console.log(spreadAdd([5, 3])); // 8

// 具有多个参数的函数
function greet(greeting: string, name: string, punctuation: string) {
  return `${greeting}, ${name}${punctuation}`;
}

const spreadGreet = spread(greet);
console.log(spreadGreet(['Hello', 'World', '!'])); // 'Hello, World!'

// 与 Math 函数一起使用
const numbers = [1, 2, 3, 4, 5];
const spreadMax = spread(Math.max);
console.log(spreadMax(numbers)); // 5

const spreadMin = spread(Math.min);
console.log(spreadMin(numbers)); // 1
```

`this` 上下文也会保持。

```typescript
import { spread } from 'es-toolkit/function';

const calculator = {
  multiply: function (a: number, b: number, c: number) {
    return a * b * c;
  },
};

const spreadMultiply = spread(calculator.multiply);
console.log(spreadMultiply.call(calculator, [2, 3, 4])); // 24
```

#### 参数

- `func` (`F`): 要将数组展开为单个参数接收的函数。

#### 返回值

(`(args: Parameters<F>) => ReturnType<F>`): 返回一个接收参数数组并以展开形式传递给原始函数的新函数。
