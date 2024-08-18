# curry

제공된 함수의 인자를 여러번에 걸쳐 입력받을 수 있도록 함수를 커링 함수로 변환해요.
커링 함수는 원본 함수의 인자를 모두 입력받을 때까지 다음 인자들을 한번에 하나씩 입력받는 형태의 함수에요.
커링 함수를 사용하면 함수를 지연 실행 시키거나, 함수의 재사용성을 높일 수 있어요.

## 인터페이스

```typescript
function curry<F extends (...args: any) => any>(func: F): (arg: Parameters<F>[0]) => CurriedFunctionResult<F>;
```

## 파라미터

- `func` (`F`): 커링 함수를 만들 함수.

## 결괏값

(`(arg: Parameters<F>[0]) => CurriedFunctionResult<F>`): 원본 함수의 인자를 하나씩 입력 받아, 모든 인자가 입력되었을 때 함수를 호출시키는 함수

## 예시

### 기본 사용법

```typescript
const sum = (a: number, b: number, c: number) => a + b + c;

const curriedSum = curry(sum);

// `a` 매개변수에 값 `10`을 입력해요
const sum10 = curriedSum(10);

// `b` 매개변수에 값 `15`를 입력해요
const sum25 = sum10(15);

// `c` 매개변수에 값 `5`를 입력해요. 원본 함수(`sum`)에 모든 인자가 입력되었으므로, 결과값을 반환해요
const result = sum25(5);
```
