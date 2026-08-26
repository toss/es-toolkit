# SetRequired

객체에서 고른 키만 필수로 바꿔요. `Required`는 모든 키를 한꺼번에 바꾸지만, `SetRequired`는 지정한 키만 건드려요.

```typescript
type Ready = SetRequired<T, K>;
```

## 사용법

### `SetRequired<T, K>`

선택적이던 키에 값이 확실히 있다는 것을 알게 된 다음에 사용하세요. 값이 있는지 검사를 마친 뒤에 자주 써요.

```typescript
import type { SetRequired } from 'es-toolkit/types';

interface User {
  id: number;
  name: string;
  avatar?: string;
}

// 여기서부터는 프로필 사진이 반드시 있는 타입이에요.
type ProfileUser = SetRequired<User, 'avatar'>;
// => { id: number; name: string; avatar: string }

declare function renderProfile(user: ProfileUser): void;

function render(user: User) {
  if (user.avatar != null) {
    renderProfile(user as ProfileUser);
  }
}
```

`A | B`처럼 여러 타입 중 하나인 값에 써도, 나중에 `if`로 어느 쪽인지 가려낼 수 있어요.

```typescript
type Method = { kind: 'card'; cardNo: string; note?: string } | { kind: 'bank'; accountNo: string; note?: string };

function f(v: SetRequired<Method, 'note'>) {
  if (v.kind === 'card') {
    return v.cardNo; // 카드 쪽으로 좁혀져요
  }
  return v.accountNo;
}
```

#### 타입 파라미터

- `T`: 바꿀 객체 타입이에요.
- `K`: 필수로 만들 키예요. `T`의 키여야 해요.
