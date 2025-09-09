# round

숫자를 지정된 자릿수로 반올림하는 함수예요.

이 함수는 숫자와 선택적으로 자릿수 값을 받아서, 지정된 소수점 자릿수로 반올림된 숫자를 반환해요.

## 인터페이스

```typescript
function round(value: number, precision?: number): number;
```

### 파라미터

- `value` (`number`): 반올림할 숫자예요.
- `precision` (`number`, optional): 반올림할 소수점 자릿수예요. 기본값은 0이에요.

### 반환 값

(`number`): 반올림된 숫자를 반환해요.

## 예시

```typescript
const result1 = round(1.2345); // result1은 1이 되어요.
const result2 = round(1.2345, 2); // result2는 1.23이 되어요.
const result3 = round(1.2345, 3); // result3는 1.235가 되어요.
const result4 = round(1.2345, 3.1); // precision이 integer가 아니면 오류를 반환해요.
```
