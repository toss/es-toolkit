# flowRight

Creates a new function that executes the given functions in sequence from right to left. The return value of the previous function is passed as an argument to the next function.

The `this` context of the returned function is also passed to the functions provided as parameters.

This method is like [flow](./flow.md), except that it creates a function that invokes the given functions from right to left.

## Signature

```typescript
function flowRight<R>(f: () => R): () => R;
function flowRight<A extends any[], R>(f1: (...args: A) => R): (...args: A) => R;
function flowRight<A extends any[], R1, R2>(f2: (a: R1) => R2, f1: (...args: A) => R1): (...args: A) => R2;
function flowRight<A extends any[], R1, R2, R3>(
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: A) => R1
): (...args: A) => R3;
function flowRight<A extends any[], R1, R2, R3, R4>(
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: A) => R1
): (...args: A) => R4;
function flowRight<A extends any[], R1, R2, R3, R4, R5>(
  f5: (a: R4) => R5,
  f4: (a: R3) => R4,
  f3: (a: R2) => R3,
  f2: (a: R1) => R2,
  f1: (...args: A) => R1
): (...args: A) => R5;
function flowRight(...funcs: Array<(...args: any[]) => any>): (...args: any[]) => any;
```

### Parameters

- `funcs` (`Array<(...args: any[]) => any>`): The functions to invoke.

### Returns

(`(...args: any[]) => any`): The new composite function.

## Examples

```typescript
const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;

const combined = flowRight(square, add);
console.log(combined(1, 2)); // => 9
```

## Lodash Compatibility

Import `flowRight` from `es-toolkit/compat` for full compatibility with lodash.

- `flowRight` can accept both arrays of functions and individual functions as arguments.
- `flowRight` will throw an error if any of the functions provided are not functions.

```typescript
import { flowRight } from 'es-toolkit/compat';

const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;
const double = (n: number) => n * 2;

const combined = flowRight(double, [square, add]);
console.log(combined(1, 2)); // => 18
```
