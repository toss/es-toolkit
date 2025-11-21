# flow (Lodash Compatibility)

::: warning Use `es-toolkit`'s `flow`
This `flow` function has become complex with added array flattening for Lodash compatibility.

Instead, use the faster and more modern `es-toolkit`'s [flow](../../function/flow.md).
:::

Creates a new function that executes the given functions from left to right sequentially.

```typescript
const combinedFunc = flow(...functions);
```

## Usage

### `flow(...functions)`

Use `flow` when you want to create a single composed function that executes multiple functions from left to right sequentially. It's useful for creating data transformation pipelines.

```typescript
import { flow } from 'es-toolkit/compat';

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

// Executes from left to right: double(square(add(x, y)))
const calculate = flow(add, square, double);
console.log(calculate(1, 2)); // double(square(add(1, 2))) = double(square(3)) = double(9) = 18

// Passing functions as an array
const calculate2 = flow([add, square], double);
console.log(calculate2(2, 3)); // 50

// Modern alternative (recommended)
const modernCalculate = (x, y) => double(square(add(x, y)));
console.log(modernCalculate(1, 2)); // 18

// Using pipe operator (future JavaScript)
const pipeCalculate = (x, y) => add(x, y) |> square |> double;

// Or chaining pattern
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

#### Parameters

- `...functions` (`Array<Function | Function[]>`): Functions to execute from left to right. Can be passed as arrays.

#### Returns

(`Function`): Returns a new composed function that executes all functions from left to right sequentially.
