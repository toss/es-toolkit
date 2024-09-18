# isNaN

주어진 값이 NaN인지 확인해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `NaN`으로 좁혀요.

## 인터페이스

```typescript
function isNaN(value: unknown): value is typeof NaN;
```

### 파라미터

- `value`(`unknown`): NaN인지 확인할 값.

### 반환 값

(`value is typeof NaN`): 값이 NaN이면 `true`, 아니면 `false`.

## 예시

```typescript
const value1 = NaN;
const value2 = undefined;

console.log(isNaN(value1)); // true
console.log(isNaN(value2)); // false
```
