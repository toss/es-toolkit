# flowRight (Lodash Compatibility)

::: warning Use `es-toolkit`'s `flowRight`
This `flowRight` function has become complex with added array flattening for Lodash compatibility.

Instead, use the faster and more modern `es-toolkit`'s [flowRight](../../function/flowRight.md).
:::

Creates a new function that executes the given functions from right to left sequentially.

```typescript
const combinedFunc = flowRight(...functions);
```

## Usage

### `flowRight(...functions)`

Use `flowRight` when you want to create a single composed function that executes multiple functions from right to left sequentially. It's useful for creating data transformation pipelines.

```typescript
import { flowRight } from 'es-toolkit/compat';

// Basic usage
function add(x, y) {
  return x + y;
}

function square(n) {
  return n * n;
}

function double(n) {
  return n * 2;
}

// Executes from right to left: double(square(add(x, y)))
const calculate = flowRight(double, square, add);
console.log(calculate(1, 2)); // double(square(add(1, 2))) = double(square(3)) = double(9) = 18

// Passing functions as an array
const calculate2 = flowRight([double, square], add);
console.log(calculate2(2, 3)); // 50

// Modern alternative (recommended)
const modernCalculate = (x, y) => double(square(add(x, y)));
console.log(modernCalculate(1, 2)); // 18

// Or using function chaining
const chainedCalculate = (x, y) => [x, y]
  .reduce((acc, val, idx) => idx === 0 ? val : acc + val)
  .valueOf()
  |> (n => n * n)
  |> (n => n * 2);
```

Generally works in the opposite order of `flow`. It works similarly to function composition, making it intuitive.

#### Parameters

- `...functions` (`Array<Function | Function[]>`): Functions to execute from right to left. Can be passed as arrays.

#### Returns

(`Function`): Returns a new composed function that executes all functions from right to left sequentially.
