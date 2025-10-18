# spread

Creates a new function that spreads a parameter array into individual parameters of the function.

```typescript
const spreadFunc = spread(func);
```

## Reference

### `spread(func)`

Use `spread` when you want to spread an array-form parameter into individual parameters to pass to a function.

This plays a similar role to JavaScript's spread operator (`...`), but it transforms the function to accept an array instead. This is useful in situations where you frequently use the `apply` method.

```typescript
import { spread } from 'es-toolkit/function';

// Basic usage
function add(a: number, b: number) {
  return a + b;
}

const spreadAdd = spread(add);
console.log(spreadAdd([5, 3])); // 8

// Function with multiple parameters
function greet(greeting: string, name: string, punctuation: string) {
  return `${greeting}, ${name}${punctuation}`;
}

const spreadGreet = spread(greet);
console.log(spreadGreet(['Hello', 'World', '!'])); // 'Hello, World!'

// Using with Math functions
const numbers = [1, 2, 3, 4, 5];
const spreadMax = spread(Math.max);
console.log(spreadMax(numbers)); // 5

const spreadMin = spread(Math.min);
console.log(spreadMin(numbers)); // 1
```

The `this` context is also maintained.

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

#### Parameters

- `func` (`F`): The function to accept a parameter array spread into individual parameters.

#### Returns

(`(args: Parameters<F>) => ReturnType<F>`): Returns a new function that accepts a parameter array and passes it to the original function in spread form.
