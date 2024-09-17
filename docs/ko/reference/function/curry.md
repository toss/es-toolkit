# curry

함수를 커링하여 한 번에 하나의 파라미터로 호출할 수 있도록 하고, 다음 파라미터를 받는 새로운 함수를 반환해요.
모든 파라미터가 제공되면, 이때 원래 함수가 지금까지 주어진 파라미터로 호출돼요.

## 인터페이스

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

### 파라미터

- `func` (`(...args: any[]) => any`): 커링할 함수예요.

### 반환 값

(`(...args: any[]) => any`): 한 번에 하나의 파라미터로 호출할 수 있는 커링된 함수예요.

## 예시

```typescript
function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curry(sum);

// 파라미터 `a`로 값 `10`을 제공해요.
const sum10 = curriedSum(10);

// 파라미터 `b`로 값 `15`을 제공해요.
const sum25 = sum10(15);

// 파라미터 `c`로 값 `5`을 제공해요.
// 함수 'sum'은 모든 파라미터를 받았기 때문에, 이제 값을 반환해요.
const result = sum25(5);
```
