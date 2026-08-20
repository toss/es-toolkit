# SetRequired

把对象中指定的键变为必填，其余保持不变。与把全部变为必填的内置 `Required` 不同，`SetRequired` 只改动指定的键。

```typescript
type Ready = SetRequired<T, K>;
```

## 用法

### `SetRequired<T, K>`

当你确认某些可选键一定存在时使用，例如在完成检查之后。

```typescript
import type { SetRequired } from 'es-toolkit/types';

interface User {
  id: number;
  name: string;
  avatar?: string;
}

// 从这里开始头像一定存在。
type ProfileUser = SetRequired<User, 'avatar'>;
// => { id: number; name: string; avatar: string }

declare function renderProfile(user: ProfileUser): void;

function render(user: User) {
  if (user.avatar != null) {
    renderProfile(user as ProfileUser);
  }
}
```

#### 类型参数

- `T`：要转换的对象类型。
- `K`：要变为必填的键，必须是 `T` 的键。
- 它会在联合类型上分发，因此传入联合仍得到联合，每个分支保持各自的形状。
