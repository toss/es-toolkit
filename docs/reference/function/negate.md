# negate

Creates a function that negates the result of the predicate func.

## 인터페이스

```typescript
function negate<Parameters extends unknown[]>(
    func: (...args: Parameters): unknown
): (...args: Parameters): boolean;
```

### 파라미터

- `func` (`(args: ...Parameters) => unknown`): The function to negate.

### 반환 값

- (`(args: ...Parameters) => boolean`): Returns the new negated function.

## 예시

```typescript
import { negate } from 'es-toolkit/function';

negate(() => true)(); // returns 'false'
negate(() => false)(); // returns 'false'
negate(() => 1); // returns 'false'
negate(() => 0); // returns 'true'
```
