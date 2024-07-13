# negate

제공된 함수 `func` 의 실행 결과를 falsy 한 값으로 변환하여 반환하는 함수를 생성해요.

## 인터페이스

```typescript
function negate<Parameters extends unknown[]>(
    func: (...args: Parameters): unknown
): (...args: Parameters): boolean;
```

### 파라미터

- `func` (`(args: ...Parameters) => unknown`): 변환 할 함수예요.

### 반환 값

- (`(args: ...Parameters) => boolean`): 참/거짓 으로 변환하여 반환될 함수.

## 예시

```typescript
import { negate } from 'es-toolkit/function';

negate(() => true)(); // returns 'false'
negate(() => false)(); // returns 'false'
negate(() => 1); // returns 'false'
negate(() => 0); // returns 'true'
```
