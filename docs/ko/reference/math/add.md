# add

두 숫자를 더하면서 `유효하지 않거나 NaN인 값`을 처리하는 함수에요.

이 함수는 두 개의 숫자 값을 받아 그 합을 반환해요.

만약 두 값 중 하나라도 `유효하지 않거나 NaN인 값`이면, `NaN`을 반환해요.

## 인터페이스

```typescript
function add(value: number, other: number): number;
```

### 파라미터

- value (number): 더할 첫 번째 숫자에요.
- other (number): 더할 두 번째 숫자에요.

### 반환 값

(number): 두 숫자의 합을 반환해요. 만약 값 중 하나가 `NaN`이거나 `유효하지 않은 값`이면, `NaN`을 반환해요.

## 예시

```typescript
const result1 = add(2, 3); // 두 값은 number 타입이기 때문에 result1은 5가 돼요.
const result2 = add(5, 'a'); // other의 값으로 number 타입이 들어오지 않았기 때문에 result2는 NaN이 돼요.
const result3 = add(NaN, 10); // value가 NaN이기 때문에 result3은 NaN이 돼요.
const result4 = add(2, NaN); // other가 NaN이기 때문에 result4는 NaN이 돼요
```
