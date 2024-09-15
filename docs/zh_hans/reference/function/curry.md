# curry

将一个函数柯里化，允许它每次只用一个参数调用，并返回一个接受下一个参数的新函数。这个过程会继续，直到所有参数都已提供，此时将使用所有累积的参数调用原始函数。

## 签名

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
```

### 参数

- `func` (`(...args: any[]) => any`): 要进行柯里化的函数。

### 返回值

(`(...args: any[]) => any`): 一个可以每次调用一个参数的柯里化函数。

## 示例

```typescript
function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curry(sum);

// The parameter `a` should be given the value `10`.
const sum10 = curriedSum(10);

// The parameter `b` should be given the value `15`.
const sum25 = sum10(15);

// The parameter `c` should be given the value `5`. The function 'sum' has received all its arguments and will now return a value.
const result = sum25(5);
```

## Lodash 兼容性

从 `es-toolkit/compat` 中导入 `curry` 以实现与 lodash 的完全兼容。

### 签名

```typescript
function curry(
  func: (...args: any[]) => any,
  arity: number = func.length,
  guard?: unknown
): ((...args: any[]) => any) & { placeholder: typeof curry.placeholder };

namespace curry {
  placeholder: symbol;
}
```

- `curry` 接受一个额外的数值参数 `arity`，该参数指定了函数的参数数量。
  - 默认为 `func.length`，如果 `arity` 为负数或 `NaN`，则会被转换为 `0`。如果它是一个小数，则会被向下取整到最接近的整数。
- `guard` 使其可以用作 `Array#map` 等方法的迭代器。
- `curry.placeholder` 值默认为一个 `symbol`，可以用作部分应用参数的占位符。
- 不像原生的 `curry`，这个方法允许每次使用多个参数调用，并返回一个接受剩余参数的新函数。

### 示例

```typescript
import { curry } from 'es-toolkit/compat';

const abc = function (a, b, c) {
  return Array.from(arguments);
};

let curried = curry(abc);

curried(1)(2)(3);
// => [1, 2, 3]

curried(1, 2)(3);
// => [1, 2, 3]

curried(1, 2, 3);
// => [1, 2, 3]

// 使用占位符进行柯里化
curried(1)(curry.placeholder, 3)(2);
// => [1, 2, 3]

// 指定参数数量
curried = curry(abc, 2);

curried(1)(2);
// => [1, 2]
```
