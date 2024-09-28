# flowRight

右から左に順番に与えられた関数を実行する新しい関数を作成します。前の関数の戻り値が次の関数への引数として渡されます。

戻り関数の`this`コンテキストも、パラメーターとして提供された関数に渡されます。

このメソッドは`flow`のようですが、右から左に与えられた関数を呼び出す関数を作成する点が異なります。

## インターフェース

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
function flowRight(...funcs: Array<(...args: any[]) => any>): (...args: any[]) => any;
```

### パラメータ

- `funcs` (`(...args: any[]) => any`): 呼び出す関数。

### 戻り値

(`(...args: any[]) => any`): 新しい合成関数。

## 例

```typescript
const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;

const combined = flowRight(square, add);
console.log(combined(1, 2)); // 9
```
