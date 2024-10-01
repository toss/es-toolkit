# curryRight

関数を右から左にカリー化して、一度に一つのパラメータで呼び出せるようにします。

順番に次のパラメータを受け取る関数を生成します。新しく生成された関数にすべてのパラメータが提供されると、この時に元の関数がこれまでに与えられたパラメータで呼び出されます。

[curry](./curry.md)とは異なり、この関数は関数を右から左にカリー化します。

## インターフェース

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
function curryRight(func: (...args: any[]) => any): (...args: any[]) => any;
```

### パラメータ

- `func` (`(...args: any[]) => any`): カリー化する関数。

### 戻り値

(`(...args: any[]) => any`): カリー化された関数。

## 例

```typescript
function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curryRight(sum);

// パラメータ `c` には値 `10` を与える必要があります。
const add10 = curriedSum(10);

// パラメータ `b` には値 `15` を与える必要があります。
const add25 = add10(15);

// パラメータ `a` には値 `5` を与える必要があります。関数 'sum' はすべての引数を受け取り、値を返します。
const result = add25(5);
```
