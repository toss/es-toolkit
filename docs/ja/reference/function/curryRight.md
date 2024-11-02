# curryRight

関数を右から左にカリー化して、一度に一つのパラメータで呼び出せるようにします。

順番に次のパラメータを受け取る関数を生成します。新しく生成された関数にすべてのパラメータが提供されると、この時に元の関数がこれまでに与えられたパラメータで呼び出されます。

[curry](./curry.md)とは異なり、この関数は関数を右から左にカリー化します。

## インターフェース

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
const result = add25(5); // 30
```

## Lodashとの互換性

`es-toolkit/compat`から`curryRight`をインポートすると、lodashと互換性があります。

### インターフェース

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

- `curryRight` 関数は数値 `arity` をパラメータとして受け取ります。このパラメータは関数が呼び出されるために必要なパラメータの数を指定します。
  - デフォルト値は関数の `length` プロパティです。`arity` が負の値または `NaN` の場合、`0` に変換されます。小数点を含む数値の場合は、最も近い整数に切り捨てられます。
- `funcs.map(curryRight)` のように `Array#map` 関数と簡単に使用できます。
- Symbol である `curryRight.placeholder` の値を使用して、パラメータを部分適用する位置を指定できます。
- 基本の `curryRight` とは異なり、一度に複数のパラメータを提供できます。残りのパラメータを受け取る新しい関数を返します。

### 例

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
