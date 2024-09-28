# flowRight

创建一个函数，该函数返回调用给定函数的结果，并将创建函数的 `this` 绑定传递给这些函数，每次调用时将上一次调用的返回值作为参数传递给下一次调用。

此方法类似于 [flow](./flow.md)，但它创建的函数从右到左调用给定的函数。

## 签名

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

### 参数

- `funcs` (`Array<(...args: any[]) => any>`): 需要调用的函数。

### 返回值

(`(...args: any[]) => any`): 新的组合函数。

## 示例

```typescript
const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;

const combined = flowRight(square, add);
console.log(combined(1, 2)); // => 9
```
