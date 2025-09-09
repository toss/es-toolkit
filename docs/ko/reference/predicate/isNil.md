# isNil

주어진 값이 null이나 undefined인지 확인해요.

값이 `null` 이나 `undefined` 이면 `true` 를 반환하고, 아니면 `false` 를 반환해요.

TypeScript의 타입 가드로 주로 사용되는데요, 파라미터로 주어진 값을 `null` 이나 `undefined` 타입으로 좁힐 수 있어요.

## 인터페이스

```typescript
function isNil(x: unknown): x is null | undefined;
```

### 파라미터

- `x` (`unknown`): `null`이나 `undefined`인지 확인할 값.

### 반환 값

(`x is null | undefined`): 값이 `null`이나 `undefined`이면 `true`, 아니면 `false`.

## 예시

```typescript
import { isNil } from 'es-toolkit/predicate';

const value1 = null;
const value2 = undefined;
const value3 = 42;
const result1 = isNil(value1); // true
const result2 = isNil(value2); // true
const result3 = isNil(value3); // false
```
