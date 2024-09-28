# flow

주어진 함수들을 연속해서 실행하는 새로운 함수를 만들어요. 이전 함수의 결괏값은 다음 함수의 인자로 주어져요.

반환된 함수에게 주어진 `this`는 파라미터로 주어진 함수들에게도 전달돼요.

## 인터페이스

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

### 파라미터

- `funcs` (`Array<(...args: any[]) => any>`): 호출할 함수들.

### 반환 값

(`(...args: any[]) => any`): 주어진 함수들을 연속해서 실행하는 새로운 함수.

## 예시

```typescript
const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;

const combined = flow(add, square);
console.log(combined(1, 2)); // 9
```
