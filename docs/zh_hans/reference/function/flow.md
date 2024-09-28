# flow

创建一个新的函数，该函数按顺序执行给定的函数。上一个函数的返回值作为参数传递给下一个函数。

返回的函数的 `this` 上下文也会传递给作为参数提供的函数。

## 签名

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

### 参数

- `funcs` (`Array<(...args: any[]) => any>`): 需要调用的函数。

### 返回值

(`(...args: any[]) => any`): 新的组合函数。

## 示例

```typescript
const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;

const combined = flow(add, square);
console.log(combined(1, 2)); // => 9
```
