# curryRight

함수를 오른쪽에서 왼쪽으로 커링해서, 한 번에 하나의 파라미터로 호출할 수 있도록 해요.

순서대로 다음 파라미터를 받는 함수를 생성해요. 새로 생성된 함수에 모든 파라미터가 제공되면, 이때 원래 함수가 지금까지 주어진 파라미터로 호출돼요.

[curry](./curry.md)와 달리, 이 함수는 함수를 오른쪽에서 왼쪽으로 커링해요.

## 인터페이스

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

### 파라미터

- `func` (`(...args: any[]) => any`): 커리할 함수에요.

### 반환 값

(`(...args: any[]) => any`): 커리된 함수에요.

## 예시

```typescript
function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curryRight(sum);

// 매개변수 `c`는 값으로 `10`을 가져요.
const add10 = curriedSum(10);

// 매개변수 `b`는 값으로 `15`를 가져요.
const add25 = add10(15);

// 매개변수 `a`는 값으로 `5`를 가져요. 함수 'sum'은 모든 파라미터를 받았으므로, 이제 값을 반환해요.
const result = add25(5);
```
