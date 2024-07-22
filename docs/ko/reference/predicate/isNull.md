# isNull

주어진 값이 null인지 확인합니다.

이 함수는 주어진 값이 `null` 인지 엄격 일치 (===) 기준으로 확인합니다.
값이 `null` 이면 `true`, 아니면 `false` 를 반환해요.

TypeScript의 타입 가드로 주로 사용되는데요, 파라미터로 주어진 값을 `null`인 타입으로 좁힐 수 있어요.

## 인터페이스

```typescript
function isNull(x: unknown): x is null;
```

### 파라미터

- `x` (`unknown`): null인지 확인할 값.

### 반환 값

(`x is null`): 값이 null이면 true, 아니면 false.

## 예시

```typescript
const value1 = null;
const value2 = undefined;
const value3 = 42;

console.log(isNull(value1)); // true
console.log(isNull(value2)); // false
console.log(isNull(value3)); // false
```
