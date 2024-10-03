# flow

Creates a new function that executes the given functions in sequence. The return value of the previous function is passed as an argument to the next function.

The `this` context of the returned function is also passed to the functions provided as parameters.

## Signature

```typescript
function flow<R>(f: () => R): () => R;
function flow<A extends any[], R>(f1: (...args: A) => R): (...args: A) => R;
function flow<A extends any[], R1, R2>(f1: (...args: A) => R1, f2: (a: R1) => R2): (...args: A) => R2;
function flow<A extends any[], R1, R2, R3>(
  f1: (...args: A) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3
): (...args: A) => R3;
function flow<A extends any[], R1, R2, R3, R4>(
  f1: (...args: A) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4
): (...args: A) => R4;
function flow<A extends any[], R1, R2, R3, R4, R5>(
  f1: (...args: A) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5
): (...args: A) => R5;
function flow(...funcs: Array<(...args: any[]) => any>): (...args: any[]) => any;
```

### Parameters

- `funcs` (`Array<(...args: any[]) => any>`): The functions to invoke.

### Returns

(`(...args: any[]) => any`): The new composite function.

## Examples

```typescript
const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;

const combined = flow(add, square);
console.log(combined(1, 2)); // => 9
```

## Lodash Compatibility

Import `flow` from `es-toolkit/compat` for full compatibility with lodash.

- `flow` can accept both arrays of functions and individual functions as arguments.
- `flow` will throw an error if any of the functions provided are not functions.

```typescript
import { flow } from 'es-toolkit/compat';

const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;
const double = (n: number) => n * 2;

const combined = flow([add, square], double);
console.log(combined(1, 2)); // => 18
```
