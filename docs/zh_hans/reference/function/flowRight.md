# flowRight

创建一个新函数，该函数按从右到左的顺序执行给定的函数。前一个函数的返回值作为参数传递给下一个函数。

返回函数的 `this` 上下文也会传递给作为参数提供的函数。

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

## Lodash 兼容性

从 `es-toolkit/compat` 导入 `flowRight` 以获得与 lodash 的完全兼容性。

- `flowRight` 可以接受函数数组和单个函数作为参数。
- 如果提供的函数中有任何一个不是函数，`flowRight` 将抛出错误。

```typescript
import { flowRight } from 'es-toolkit/compat';

const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;
const double = (n: number) => n * 2;

const combined = flowRight(double, [square, add]);
console.log(combined(1, 2)); // => 18
```
