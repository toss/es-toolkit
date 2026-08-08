# deepFreeze

객체를 깊게 동결하여 모든 중첩된 객체를 변경 불가능하게 만들어요.

`Object.freeze`는 객체의 직접적인 속성만 동결하지만,
`deepFreeze`는 모든 중첩된 객체와 배열을 재귀적으로 동결해요.

## 인터페이스

```typescript
function deepFreeze<T>(obj: T): T;
```

### 파라미터

- `obj` (`T`): 깊게 동결할 객체예요.

### 반환 값

(`T`): 깊게 동결된 객체를 반환해요.

## 예시

```typescript
import { deepFreeze } from 'es-toolkit/object';

const frozen = deepFreeze({ user: { name: 'Alex', age: 20 } });

frozen.user = {}; // strict 모드에서 TypeError
frozen.user.age = 22; // strict 모드에서 TypeError
```
