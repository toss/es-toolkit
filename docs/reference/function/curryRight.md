# curryRight

Curries a function from right to left, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.

This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.

This method is like [curry](./curry.md), except that it curries the function from right to left.

## Signature

```typescript
function curryRight<R>(func: () => R): () => R;
function curryRight<P, R>(func: (p: P) => R): (p: P) => R;
function curryRight<P1, P2, R>(func: (p1: P1, p2: P2) => R): (p2: P2) => (p1: P1) => R;
function curryRight<P1, P2, P3, R>(func: (p1: P1, p2: P2, p3: P3) => R): (p3: P3) => (p2: P2) => (p1: P1) => R;
function curryRight<P1, P2, P3, P4, R>(
  func: (p1: P1, p2: P2, p3: P3, p4: P4) => R
): (p4: P4) => (p3: P3) => (p2: P2) => (p1: P1) => R;
function curryRight<P1, P2, P3, P4, P5, R>(
  func: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R
): (p5: P5) => (p4: P4) => (p3: P3) => (p2: P2) => (p1: P1) => R;
function curryRight(func: (...args: any[]) => any): (...args: any[]) => any;
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

const curriedSum = curryRight(sum);

// The parameter `c` should be given the value `10`.
const sum10 = curriedSum(10);

// The parameter `b` should be given the value `15`.
const sum25 = sum10(15);

// The parameter `a` should be given the value `5`. The function 'sum' has received all its arguments and will now return a value.
const result = sum25(5); // 30
```

## Lodash Compatibility

Import `curryRight` from `es-toolkit/compat` for full compatibility with lodash.

### Signature

```typescript
function curryRight(
  func: (...args: any[]) => any,
  arity: number = func.length,
  guard?: unknown
): ((...args: any[]) => any) & { placeholder: typeof curryRight.placeholder };

namespace curryRight {
  placeholder: symbol;
}
```

- `curryRight` accepts an additional numeric parameter, `arity`, which specifies the number of arguments the function should accept.
  - Defaults to the `length` property of the function. If `arity` is negative or `NaN`, it will be converted to `0`. If it's a fractional number, it will be rounded down to the nearest integer.
- `guard` enables use as an iteratee for methods like `Array#map`.
- The `curryRight.placeholder` value, which defaults to a `symbol`, may be used as a placeholder for partially applied arguments.
- Unlike the native `curryRight`, this function allows multiple arguments to be called at once and returns a new function that accepts the remaining arguments.

### Examples

```typescript
import { curryRight } from 'es-toolkit/compat';

const abc = function (a, b, c) {
  return [a, b, c];
};

const curried = curryRight(abc);

curried(3)(2)(1);
// => [1, 2, 3]

curried(2, 3)(1);
// => [1, 2, 3]

curried(1, 2, 3);
// => [1, 2, 3]

// Curried with placeholders.
curried(3)(curryRight.placeholder, 2)(1);
// => [1, 2, 3]

// Curried with arity.
curried = curryRight(abc, 2);

curried(2)(1);
// => [1, 2]
```
