# curry

関数をカリー化し、1回に1つのパラメータで呼び出すことができ、次のパラメータを取る新しい関数を返し続けます。
このプロセスはすべてのパラメータが提供されるまで続き、すべてのパラメータが蓄積された段階で元の関数が呼び出されます。

## インターフェース

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
function curry(func: (...args: any[]) => any): (...args: any[]) => any;
```

### パラメータ

- `func` (`(...args: any[]) => any`): カリー化する関数。

### 戻り値

(`(...args: any[]) => any`): 1回に1つのパラメータで呼び出すことができるカリー化された関数。

## 例

```typescript
function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curry(sum);

// パラメータ `a` に値 `10` を与えます。
const sum10 = curriedSum(10);

// パラメータ `b` に値 `15` を与えます。
const sum25 = sum10(15);

// パラメータ `c` に値 `5` を与えます。
// 関数 'sum' はすべてのパラメータを受け取ったので、今値を返します。
const result = sum25(5);
```
