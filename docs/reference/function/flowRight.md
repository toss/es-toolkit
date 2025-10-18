# flowRight

Creates a new function that executes the given functions in sequence from right to left.

```typescript
const combined = flowRight(func1, func2, func3);
```

## Reference

### `flowRight(...funcs)`

Use `flowRight` when you want to create a new function that executes multiple functions from right to left in sequence. The return value of the previous function is passed as a parameter to the next function.

This is useful for creating data transformation pipelines by composing functions in reverse order. It executes functions in the opposite direction to `flow`.

```typescript
import { flowRight } from 'es-toolkit/function';

const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;
const double = (n: number) => n * 2;

// Executes from right to left: double -> square -> add
const combined = flowRight(double, square, add);
console.log(combined(1, 2)); // 18
// Execution order: add(1, 2) = 3, square(3) = 9, double(9) = 18

// Can also be used with a single function
const single = flowRight((x: number) => x + 1);
console.log(single(5)); // 6
```

The `this` context is also passed to the functions.

```typescript
import { flowRight } from 'es-toolkit/function';

const context = {
  multiplier: 3,
};

function multiply(this: typeof context, x: number) {
  return x * this.multiplier;
}

const add = (x: number) => x + 10;

const combined = flowRight(multiply, add).bind(context);
console.log(combined(5)); // 45
// Execution order: add(5) = 15, multiply(15) = 45
```

#### Parameters

- `funcs` (`(...args: any[]) => any`): The functions to compose.

#### Returns

(`(...args: any[]) => any`): Returns a new function that executes the given functions from right to left in sequence.
