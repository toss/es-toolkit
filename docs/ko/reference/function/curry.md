# curry

함수를 커링해서, 한 번에 하나의 파라미터로 호출할 수 있도록 해요.

순서대로 다음 파라미터를 받는 함수를 생성해요. 새로 생성된 함수에 모든 파라미터가 제공되면, 이때 원래 함수가 지금까지 주어진 파라미터로 호출돼요.

[curryRight](./curryRight.md)와 달리, 이 함수는 함수를 왼쪽에서 오른쪽으로 커링해요.

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

## Lodash와의 호환성

`es-toolkit/compat`에서 `curry`를 가져오면 lodash와 호환돼요.

### 인터페이스

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

- `curry` 함수는 숫자 `arity`를 파라미터로 받아요. 이 파라미터는 함수가 호출되기 위해 받아야 하는 파라미터의 숫자를 지정해요.
  - 기본값은 함수의 `length` 프로퍼티예요. `arity`가 음수이거나 `NaN`이라면, `0`으로 변환돼요. 소수점이 있는 숫자라면, 가장 가까운 정수로 내림해요.
- `funcs.map(curry)` 처럼 `Array#map` 함수와 쉽게 사용할 수 있어요.
- Symbol인 `curry.placeholder` 값을 사용해서, 파라미터를 부분 적용할 위치를 지정할 수 있어요.
- 기본 `curry`와 다르게, 한 번에 여러 파라미터를 제공할 수 있어요. 남은 파라미터를 받는 새로운 함수를 반환해요.

### 예시

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

// Curried with placeholders.
curried(1)(curry.placeholder, 3)(2);
// => [1, 2, 3]

// Curried with arity.
curried = curry(abc, 2);

curried(1)(2);
// => [1, 2]
```
