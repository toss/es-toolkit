# negate

참과 거짓을 반환하는 함수 `func` 의 실행 결과를 반대로 바꿔요.

## 인터페이스

```typescript
function negate<F extends (...args: unknown[]) => boolean>(func: F): F;
```

### 파라미터

- `func` (`F extends (args: ...Parameters) => unknown`): 반환 값을 반대로 바꿀 함수.

### 반환 값

- (`F`): 반환 값이 반대로 바뀐 함수.

## 예시

```typescript
import { negate } from 'es-toolkit/function';

negate(() => true)(); // returns 'false'
negate(() => false)(); // returns 'true'
```
