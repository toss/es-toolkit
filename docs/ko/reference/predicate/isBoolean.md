# isBoolean

주어진 값이 불리언(boolean)인지 확인합니다.

이 함수는 주어진 값이 `boolean` 타입인지 엄격하게 확인합니다.
값이 `boolean`이면 `true`를 반환하고, 아니면 `false`를 반환해요.

TypeScript의 타입 가드로 주로 사용되는데요, 파라미터로 주어진 값을 `boolean`인 타입으로 좁힐 수 있어요.

## 인터페이스

```typescript
function isBoolean(x: unknown): x is boolean;
```

### 파라마ㅣ터

- `x` (`unknown`): 불리언인지 테스트할 값.

### 반환 값

(`x is boolean`): 값이 boolean이면 true, 그렇지 않으면 false.

## 예시

```typescript
const value1 = true;
const value2 = 0;
const value3 = 'abc';

console.log(isBoolean(value1)); // true
console.log(isBoolean(value2)); // false
console.log(isBoolean(value3)); // false
```