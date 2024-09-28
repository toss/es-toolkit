# flowRight

주어진 함수들을 오른쪽에서 왼쪽으로 순서대로 실행하는 새로운 함수를 생성해요. 이전 함수의 결괏값은 다음 함수의 파라미터로 주어져요.

반환된 함수에게 주어진 `this`는 파라미터로 주어진 함수들에게도 전달돼요.

이 메서드는 `flow`와 비슷하지만, 주어진 함수들을 오른쪽에서 왼쪽으로 호출하는 함수를 생성해요.

## 인터페이스

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

### 파라미터

- `funcs` (`(...args: any[]) => any`): 호출할 함수들.

### 반환 값

(`(...args: any[]) => any`): 주어진 함수들을 오른쪽에서 왼쪽으로 순서대로 실행하는 새로운 함수.

## 예시

```typescript
const add = (x: number, y: number) => x + y;
const square = (n: number) => n * n;

const combined = flowRight(square, add);
console.log(combined(1, 2)); // 9
```
