# deepFreeze

객체와 그 안에 중첩된 모든 객체와 배열을 재귀적으로 얼려서 수정할 수 없게 만들어요.

```typescript
const frozen = deepFreeze(obj);
```

## 사용법

### `deepFreeze(obj)`

객체를 완전히 수정할 수 없게 만들고 싶을 때 `deepFreeze`를 사용하세요. `Object.freeze`는 객체의 최상위 프로퍼티만 얼리기 때문에 중첩된 객체는 여전히 수정할 수 있어요. `deepFreeze`는 중첩된 객체와 배열까지 모두 재귀적으로 얼려서, 어떤 깊이에서도 값을 바꿀 수 없게 해요.

객체는 그 자리에서 얼려지고, 같은 참조가 그대로 반환돼요. 이미 얼려진 객체는 건너뛰기 때문에 순환 참조가 있어도 안전하게 처리돼요.

```typescript
import { deepFreeze } from 'es-toolkit/object';

// 중첩된 객체도 얼려져요
const user = deepFreeze({ name: 'Alex', settings: { theme: 'dark' } });
user.settings.theme = 'light'; // strict 모드에서 TypeError가 발생해요
// user.settings는 여전히 { theme: 'dark' }예요

// 배열과 배열 안의 객체도 얼려져요
const config = deepFreeze({ tags: ['admin', 'user'] });
config.tags.push('guest'); // strict 모드에서 TypeError가 발생해요
```

#### 파라미터

- `obj` (`T`): 깊이 얼릴 객체예요.

#### 반환 값

(`T`): 자기 자신과 중첩된 모든 객체와 배열이 얼려진, 같은 객체를 반환해요.
