# curry

Curries a function, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.
This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.

## Signature

```typescript
function curry<R>(func: () => R): () => R;
function curry<P, R>(func: (p: P) => R): (p: P) => R;
function curry<P1, P2, R>(func: (p1: P1, p2: P2) => R): (p1: P1) => (p2: P2) => R;
function curry<P1, P2, P3, R>(func: (p1: P1, p2: P2, p3: P3) => R): (p1: P1) => (p2: P2) => (p3: P3) => R;
function curry<P1, P2, P3, P4, R>(
  func: (p1: P1, p2: P2, p3: P3, p4: P4) => R
): (p1: P1) => (p2: P2) => (p3: P3) => (p4: P4) => R;
function curry<P1, P2, P3, P4, P5, R>(
  func: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R
): (p1: P1) => (p2: P2) => (p3: P3) => (p4: P4) => (p5: P5) => R;
function curry(func: (...args: any[]) => any): (...args: any[]) => any;
```

### Parameters

- `func` (`Function`): The function to curry.

### Returns

(`Function`): A curried function that can be called with a single argument at a time.

## Examples

```typescript
function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curry(sum);

// The parameter `a` should be given the value `10`.
const sum10 = curriedSum(10);

// The parameter `b` should be given the value `15`.
const sum25 = sum10(15);

// The parameter `c` should be given the value `5`. The function 'sum' has received all its arguments and will now return a value.
const result = sum25(5);
```

## Lodash Compatibility

Import `curry` from `es-toolkit/compat` for full compatibility with lodash.

### Signature

```typescript
function curry(
  func: (...args: any[]) => any,
  arity: number = func.length,
  guard?: unknown
): ((...args: any[]) => any) & { placeholder: typeof curry.placeholder };

namespace curry {
  placeholder: symbol;
}
```

- `curry` accepts an additional numeric parameter, `arity`, which specifies the number of arguments the function should accept.
  - Defaults to the `length` property of the function. If `arity` is negative or `NaN`, it will be converted to `0`. If it's a fractional number, it will be rounded down to the nearest integer.
- `guard` enables use as an iteratee for methods like `Array#map`.
- The `curry.placeholder` value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
- Unlike the native `curry`, this function allows multiple arguments to be called at once and returns a new function that accepts the remaining arguments.

### Examples

```typescript
import { curry } from 'es-toolkit/compat';

const abc = function (a, b, c) {
  return Array.from(arguments);
};

let curried = curry(abc);

curried(1)(2)(3);
// => [1, 2, 3]

curried(1, 2)(3);
// => [1, 2, 3]

curried(1, 2, 3);
// => [1, 2, 3]

// Curried with placeholders.
curried(1)(curry.placeholder, 3)(2);
// => [1, 2, 3]

// Curried with arity.
curried = curry(abc, 2);

curried(1)(2);
// => [1, 2]
```
