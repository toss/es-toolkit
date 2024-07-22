# isPrimitive

값이 JavaScript 원시 값(primitive)인지 확인해요.

JavaScript 원시 값은 null, undefined, string, number, symbol, bigint를 말해요.

## 인터페이스

```typescript
function isPrimitive(x: unknown): x is null | undefined | string | number | boolean | symbol | bigint;
```

### 파라미터

- `x` (`unknown`): 검사할 값.

### 반환 값

(`x is null | undefined | string | number | boolean | symbol | bigint`): 값이 원시 값이면 `true`, 아니면 `false`.

## 예시

```typescript
import { isPrimitive } from 'es-toolkit/predicate';

isPrimitive(null); // true
isPrimitive(undefined); // true
isPrimitive('123'); // true
isPrimitive(false); // true
isPrimitive(true); // true
isPrimitive(Symbol('a')); // true
isPrimitive(123n); // true
isPrimitive({}); // false
isPrimitive(new Date()); // false
isPrimitive(new Map()); // false
isPrimitive(new Set()); // false
isPrimitive([1, 2, 3]); // false
```
