# isBigInt

주어진 값이 bigint인지 확인해요.

이 함수는 TypeScript의 타입 가드로도 사용할 수 있어서, 전달된 값의 타입을 `bigint`로 좁혀줘요.

## 인터페이스

```typescript
function isBigInt(x: unknown): x is bigint;
```

### 파라미터

- `x` (`unknown`): bigint인지 테스트할 값.

### 반환 값

(`x is bigint`): 값이 bigint이면 true, 그렇지 않으면 false.

## 예시

```typescript
const value1 = 0n;
const value2 = 0;
const value3 = '123';

console.log(isBigInt(value1)); // true
console.log(isBigInt(value2)); // false
console.log(isBigInt(value3)); // false
```
