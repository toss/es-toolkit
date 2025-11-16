# pipe

지정된 함수 파이프라인을 기본 값부터 시작해서 실행하고, 최종 결과를 반환해요.

```typescript
const result = pipe(value, func1, func2);
```

## 사용법

### `pipe(value, ...funcs)`

여러 함수를 파이프라인으로 연결하고 기본 값에 즉시 실행하고 싶을 때 `pipe`를 사용하세요. 기본 값은 첫 번째 함수의 입력이 되고, 각 함수의 반환 값은 다음 함수의 입력이 돼요. 이것은 함수 호출을 중첩하거나 여러 임시 변수를 사용하지 않고 데이터를 변환할 때 유용해요.

```typescript
const double = (n: number) => n * 2;
const square = (n: number) => n * n;
const half = (n: number) => n / 2;
const numToStr = (n: number) => String(n);

// 첫 번째 double(5) = 10
// 두 번째 square(10) = 100
// 세 번째 half(100) = 50
// 마지막 numToStr(50) -> '50'
const result = pipe(5, double, square, half, numToStr);
// 반환값: '50'
```

#### 파라미터

- `value` (`any`): 기본 값이에요.
- `funcs` (`Array<(result: any) => any>`): 순서대로 실행할 함수들이에요.

#### 반환 값

(`any`): `funcs`의 마지막 함수의 반환 값이에요. 함수가 전달되지 않으면, `value`가 직접 반환돼요.
