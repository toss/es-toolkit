# isFiniteNumber

주어진 값이 유한한 숫자인지 확인해요.

유한한 숫자란, `Infinity`, `-Infinity`, `NaN`이 아닌 숫자를 말해요.

TypeScript의 타입 가드로 사용할 수 있어요. 파라미터로 주어진 값의 타입을 `number`로 좁혀요.

## 인터페이스

```typescript
function isFiniteNumber(value: unknown): value is number;
```

### 파라미터

- `value` (`unknown`): 유효한 길이인지 확인할 값.

### 반환 값

(`value is number`): 값이 유한한 숫자이면 `true`, 아니면 `false`.

## 예시

```typescript
import { isFiniteNumber } from 'es-toolkit/predicate';

const value1 = 42;
const value2 = -42;
const value3 = Infinity;
const value4 = -Infinity;
const value5 = NaN;
const value6 = 'string';
const value7 = {};

console.log(isFiniteNumber(value1)); // true
console.log(isFiniteNumber(value2)); // true
console.log(isFiniteNumber(value3)); // false
console.log(isFiniteNumber(value4)); // false
console.log(isFiniteNumber(value5)); // false
console.log(isFiniteNumber(value6)); // false
console.log(isFiniteNumber(value7)); // false
```
