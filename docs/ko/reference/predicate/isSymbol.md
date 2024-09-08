# isSymbol

값이 `symbol`인지 여부를 확인해요.

이 함수는 TypeScript에서 타입 술어로도 사용될 수 있으며, 인수의 타입을 `symbol`로 좁혀요.

## 인터페이스

```typescript
function isSymbol(value: unknown): value is symbol;
```

### 파라미터

- `value` (`unknown`) 확인할 값이에요.

### 반환 값

(`value is symbol`): `value`가 심볼이면 `true`, 아니면 `false`를 반환해요.

## 예시

```typescript
import { isSymbol } from 'es-toolkit/predicate';

isSymbol(Symbol('a')); // true
isSymbol(Symbol.for('a')); // true
isSymbol(Symbol.iterator); // true

isSymbol(null); // false
isSymbol(undefined); // false
isSymbol('123'); // false
isSymbol(false); // false
isSymbol(123n); // false
isSymbol({}); // false
isSymbol([1, 2, 3]); // false
```
