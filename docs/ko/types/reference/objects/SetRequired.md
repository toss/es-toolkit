# SetRequired

객체에서 원하는 키만 골라 필수로 만들어요. 기본 `Required`가 전부를 필수로 만든다면, `SetRequired`는 지정한 키만 바꿔요.

```typescript
type Ready = SetRequired<T, K>;
```

## 사용법

### `SetRequired<T, K>`

선택적이던 키가 확실히 있다는 걸 알게 된 다음에 사용하세요. 확인을 마친 뒤 같은 경우예요.

```typescript
import type { SetRequired } from 'es-toolkit/types';

interface User {
  id: number;
  name: string;
  avatar?: string;
}

// 여기서부터는 프로필 사진이 반드시 있어요.
type ProfileUser = SetRequired<User, 'avatar'>;
// => { id: number; name: string; avatar: string }

declare function renderProfile(user: ProfileUser): void;

function render(user: User) {
  if (user.avatar != null) {
    renderProfile(user as ProfileUser);
  }
}
```

#### 타입 파라미터

- `T`: 바꿀 객체 타입이에요.
- `K`: 필수로 만들 키예요. `T`의 키여야 해요.
- 유니온에 분배돼요. 그래서 유니온을 넣으면 유니온으로 나오고, 각 갈래가 자기 모양을 그대로 유지해요.
