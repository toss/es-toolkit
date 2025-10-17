# flowRight (Lodash 兼容性)

::: warning 使用 `es-toolkit` 的 `flowRight`
这个 `flowRight` 函数为了 Lodash 兼容性添加了数组扁平化处理，变得复杂了。

建议使用更快、更现代的 `es-toolkit` 的 [flowRight](../../function/flowRight.md)。
:::

创建一个新函数，从右到左依次执行给定的函数。

```typescript
const combinedFunc = flowRight(...functions);
```

## 参考

### `flowRight(...functions)`

当您想要创建一个从右到左依次执行多个函数的组合函数时，请使用 `flowRight`。它对于创建数据转换管道很有用。

```typescript
import { flowRight } from 'es-toolkit/compat';

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

// 从右到左执行: double(square(add(x, y)))
const calculate = flowRight(double, square, add);
console.log(calculate(1, 2)); // double(square(add(1, 2))) = double(square(3)) = double(9) = 18

// 以数组形式传递函数
const calculate2 = flowRight([double, square], add);
console.log(calculate2(2, 3)); // 50

// 现代替代方案（推荐）
const modernCalculate = (x, y) => double(square(add(x, y)));
console.log(modernCalculate(1, 2)); // 18

// 或使用函数链
const chainedCalculate = (x, y) => [x, y]
  .reduce((acc, val, idx) => idx === 0 ? val : acc + val)
  .valueOf()
  |> (n => n * n)
  |> (n => n * 2);
```

通常以与 `flow` 相反的顺序工作。它的工作方式类似于函数组合，因此很直观。

#### 参数

- `...functions` (`Array<Function | Function[]>`): 要从右到左执行的函数。也可以以数组形式传递。

#### 返回值

(`Function`): 返回一个新的组合函数，从右到左依次执行所有函数。
