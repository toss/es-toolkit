# curry

Curries a function so it can be called with one argument at a time.

```typescript
const curriedFunc = curry(func);
```

## Reference

### `curry(func)`

Use `curry` when you want to partially apply a function. The curried function returns a new function until it receives all required arguments. Once all arguments are provided, the original function is executed.

```typescript
import { curry } from 'es-toolkit/function';

function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curry(sum);

// Provide value `10` for argument `a`
const sum10 = curriedSum(10);

// Provide value `15` for argument `b`
const sum25 = sum10(15);

// Provide value `5` for argument `c`
// All arguments have been received, so now it returns the value
const result = sum25(5);
// Returns: 30
```

This is useful for creating reusable functions.

```typescript
function multiply(a: number, b: number) {
  return a * b;
}

const curriedMultiply = curry(multiply);
const double = curriedMultiply(2);
const triple = curriedMultiply(3);

double(5); // Returns: 10
triple(5); // Returns: 15
```

#### Parameters

- `func` (`(...args: any[]) => any`): The function to curry.

#### Returns

(`(...args: any[]) => any`): A curried function that can be called with one argument at a time.
