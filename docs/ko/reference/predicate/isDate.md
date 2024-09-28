# isDate

주어진 값이 Date 객체인지 확인해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `Date`로 좁혀요.

## 인터페이스

```typescript
function isDate(value: unknown): value is Date;
```

### 파라미터

- `value`(`unknown`): Date 객체인지 테스트할 값.

### 반환 값

(`value is Date`): 값이 Date 객체이면 `true`, 아니면 `false`.

## 예시

```typescript
const value1 = new Date();
const value2 = '2024-01-01';

console.log(isDate(value1)); // true
console.log(isDate(value2)); // false
```
