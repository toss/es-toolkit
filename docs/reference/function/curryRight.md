# curryRight

Curries a function from right to left, allowing it to be called with a single argument at a time and returning a new function that takes the next argument.

This process continues until all arguments have been provided, at which point the original function is called with all accumulated arguments.

This method is like [curry](./curry.md), except that it curries the function from right to left.

## Signature

```typescript
function curryRight<R>(func: () => R): () => R;
function curryRight<P, R>(func: (p: P) => R): (p: P) => R;
function curryRight<P1, P2, R>(func: (p1: P1, p2: P2) => R): (p1: P2) => (p2: P1) => R;
function curryRight<P1, P2, P3, R>(func: (p1: P1, p2: P2, p3: P3) => R): (p1: P3) => (p2: P2) => (p3: P1) => R;
function curryRight<P1, P2, P3, P4, R>(
  func: (p1: P1, p2: P2, p3: P3, p4: P4) => R
): (p1: P4) => (p2: P3) => (p3: P2) => (p4: P1) => R;
function curryRight<P1, P2, P3, P4, P5, R>(
  func: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R
): (p1: P5) => (p2: P4) => (p3: P3) => (p4: P2) => (p5: P1) => R;
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
const result = sum25(5);
```
