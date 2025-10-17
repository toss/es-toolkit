# spread

创建一个将参数数组展开为函数的单个参数进行传递的新函数。

```typescript
const spreadFunc = spread(func);
```

## 参考

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

## 与 Lodash 的兼容性

从 `es-toolkit/compat` 导入 `spread` 可与 lodash 兼容。

- `spread` 额外接收一个名为 `argsIndex` 的数字参数。此参数表示要展开的参数数组的给定索引。
  - 如果 `argsIndex` 为负数或 `NaN`,则视为默认值 `0`。如果是小数,则向下舍入到最接近的整数。

```typescript
import { spread } from 'es-toolkit/compat';

function fn(a: unknown, b: unknown, c: unknown) {
  return Array.from(arguments);
}

spread(fn, -1)([1, 2]); // Returns [1, 2]
spread(fn, NaN)([1, 2]); // Returns [1, 2]
spread(fn, 'a')([1, 2]); // Returns [1, 2]
spread(fn, 1.6)(1, [2, 3]); // Returns [1, 2, 3]
```
