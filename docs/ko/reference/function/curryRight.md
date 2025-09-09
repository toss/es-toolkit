# curryRight

함수를 오른쪽에서 왼쪽으로 커링해서, 한 번에 하나의 파라미터로 호출할 수 있도록 해요.

순서대로 다음 파라미터를 받는 함수를 생성해요. 새로 생성된 함수에 모든 파라미터가 제공되면, 이때 원래 함수가 지금까지 주어진 파라미터로 호출돼요.

[curry](./curry.md)와 달리, 이 함수는 함수를 오른쪽에서 왼쪽으로 커링해요.

## 인터페이스

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

### 파라미터

- `func` (`(...args: any[]) => any`): 커리할 함수예요.

### 반환 값

(`(...args: any[]) => any`): 커리된 함수예요.

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
const result = add25(5); // 30
```

## Lodash와의 호환성

`es-toolkit/compat`에서 `curryRight`를 가져오면 lodash와 호환돼요.

### 인터페이스

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

- `curryRight` 함수는 숫자 `arity`를 파라미터로 받아요. 이 파라미터는 함수가 호출되기 위해 받아야 하는 파라미터의 숫자를 지정해요.
  - 기본값은 함수의 `length` 프로퍼티예요. `arity`가 음수이거나 `NaN`이라면, `0`으로 변환돼요. 소수점이 있는 숫자라면, 가장 가까운 정수로 내림해요.
- `funcs.map(curryRight)` 처럼 `Array#map` 함수와 쉽게 사용할 수 있어요.
- Symbol인 `curryRight.placeholder` 값을 사용해서, 파라미터를 부분 적용할 위치를 지정할 수 있어요.
- 기본 `curryRight`와 다르게, 한 번에 여러 파라미터를 제공할 수 있어요. 남은 파라미터를 받는 새로운 함수를 반환해요.

### 예시

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
