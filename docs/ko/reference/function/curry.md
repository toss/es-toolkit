# curry

함수를 커링하여 한 번에 하나의 파라미터로 호출할 수 있도록 하고, 다음 파라미터를 받는 새로운 함수를 반환해요.
모든 파라미터가 제공되면, 이때 원래 함수가 지금까지 주어진 파라미터로 호출돼요.

## 인터페이스

```typescript
function curry<F extends (...args: any) => any, A extends number = FullParameters<F>['length']>(
  func: F,
  arity: A = func.length
): CurryResult<F, A>;
```

### 파라미터

- `func` (`F`): 커링할 함수예요.
- `arity` (`A`): 입력할 인자의 갯수에요.

### 반환 값

(`CurryResult<F, A>`): 한 번에 하나의 파라미터로 호출할 수 있는 커링된 함수예요.

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

// Curring the function with optional parameters.
function minus(a: number, b: number, c?: number, d?: number) {
  return a - b - (c ?? 1) - (d ?? 0);
}

// 파라미터 `a`로 값 `10`을 제공하고, `b`로 값 `5`을 제공해요.
const minusFrom5 = curry(minus)(10)(5);

// 파라미터 `c`에는 값을 제공하지 않아, 값 `undefined`이 전달돼요.
const minusFrom4 = minusFrom5();

// 파라미터 `d`에는 값을 제공하지 않아, 값 `undefined`이 전달돼요. 함수 `minus`는 모든 파라미터를 받았기 때문에, 이제 값을 반환해요.
const result4 = minusFrom4();

// 파라미터 `d`는 optional parameter이기 때문에 값을 제공받을 수도 있어요.
const result3 = minusFrom4(1);

// 입력받을 인자의 길이를 2로 설정해요. `minus` 함수는 이제 2개의 인자값만 입력받아요.
const curriedMinus = curry(minus, 2);

// 파라미터 `a`로 값 `10`을 제공해요.
const minusFrom10 = curriedMinus(10);

// 파라미터 `b`로 값 `5`를 제공해요. 함수 `minus`는 모든 파라미터를 받았기 때문에, 이제 값을 반환해요.
const result5 = minusFrom10(5);
```
