# subtract

두 숫자의 차이를 반환하는 함수예요.

둘 중 하나라도 `NaN`이면 `NaN`을 반환해요.

## 인터페이스

```typescript
function subtract(value: number, other: number): number;
```

### 파라미터

- `value` (`number`): 기준이 되는 숫자예요.
- `other` (`number`): `value`에서 뺄 숫자예요.

### 반환 값

(`number`): `value`에서 `other`를 뺀 값을 반환해요. 둘 중 하나라도 `NaN`이면 `NaN`을 반환해요.

## 예시

```typescript
subtract(6, 4); // 2를 반환해요.
subtract(-6, 4); // -10을 반환해요.
subtract(NaN, 4); // value가 NaN이기 때문에 NaN을 반환해요.
subtract(6, NaN); // other이 NaN이기 때문에 NaN을 반환해요.
subtract(NaN, NaN); // 인수가 모두 NaN이기 때문에 NaN을 반환해요.
```
