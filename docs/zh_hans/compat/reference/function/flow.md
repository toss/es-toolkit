# flow (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `flow`
这个 `flow` 函数为了 Lodash 兼容性添加了数组扁平化处理，变得复杂了。

建议使用更快、更现代的 `es-toolkit` 的 [flow](../../function/flow.md)。
:::

创建一个新函数，从左到右依次执行给定的函数。

```typescript
const combinedFunc = flow(...functions);
```

## 用法

### `flow(...functions)`

当您想要创建一个从左到右依次执行多个函数的组合函数时，请使用 `flow`。它对于创建数据转换管道很有用。

```typescript
import { flow } from 'es-toolkit/compat';

// 基本用法
function add(x, y) {
  return x + y;
}

function square(n) {
  return n * n;
}

function double(n) {
  return n * 2;
}

// 从左到右执行: double(square(add(x, y)))
const calculate = flow(add, square, double);
console.log(calculate(1, 2)); // double(square(add(1, 2))) = double(square(3)) = double(9) = 18

// 以数组形式传递函数
const calculate2 = flow([add, square], double);
console.log(calculate2(2, 3)); // 50

// 现代替代方案（推荐）
const modernCalculate = (x, y) => double(square(add(x, y)));
console.log(modernCalculate(1, 2)); // 18

// 使用管道操作符（未来的 JavaScript）
const pipeCalculate = (x, y) => add(x, y) |> square |> double;

// 或使用链式模式
class Calculator {
  constructor(value) {
    this.value = value;
  }

  add(n) {
    this.value += n;
    return this;
  }

  square() {
    this.value *= this.value;
    return this;
  }

  double() {
    this.value *= 2;
    return this;
  }

  valueOf() {
    return this.value;
  }
}

const chainedResult = new Calculator(3).square().double().valueOf(); // 18
```

#### 参数

- `...functions` (`Array<Function | Function[]>`): 要从左到右执行的函数。也可以以数组形式传递。

#### 返回值

(`Function`): 返回一个新的组合函数，从左到右依次执行所有函数。
