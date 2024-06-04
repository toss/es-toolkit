# isUndefined

주어진 값이 undefined인지 확인해요.

이 함수는 주어진 값이 `undefined` 인지 엄격 일치 (===) 기준으로 확인합니다.
값이 `undefined` 이면 `true`, 아니면 `false` 를 반환해요.

TypeScript의 타입 가드로 주로 사용되는데요, 파라미터로 주어진 값을 `undefined`인 타입으로 좁힐 수 있어요.

## 인터페이스

```typescript
function isUndefined(x: unknown): x is undefined;
```

### 파라미터

- `x` (`unknown`): undefined인지 확인할 값

### 반환 값

(`x is undefined`): 값이 undefined이면 true, 아니면 false.

## 예시

```typescript
const value1 = undefined;
const value2 = null;
const value3 = 42;

console.log(isUndefined(value1)); // true
console.log(isUndefined(value2)); // false
console.log(isUndefined(value3)); // false
```
