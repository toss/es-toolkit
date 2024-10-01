# curryRight

将一个函数从右到左进行柯里化，允许它每次只用一个参数调用，并返回一个接受下一个参数的新函数。这个过程会继续，直到所有参数都已提供，此时将使用所有累积的参数调用原始函数。

这个方法类似于 [curry](./curry.md)，不同之处在于它从右到左对函数进行柯里化。

## 签名

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

### 参数

- `func` (`(...args: any[]) => any`): 要进行柯里化的函数。

### 返回值

(`(...args: any[]) => any`): 一个可以每次调用一个参数的柯里化函数。

## 示例

```typescript
function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curryRight(sum);

// 参数 `c` 应该被赋值为 `10`。
const sum10 = curriedSum(10);

// 参数 `b` 应该被赋值为 `15`。
const sum25 = sum10(15);

// 参数 `a` 应该被赋值为 `5`。函数 'sum' 已经接收到了所有参数，现在将返回一个值。
const result = sum25(5);
```
