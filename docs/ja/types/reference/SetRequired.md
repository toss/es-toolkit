# SetRequired

オブジェクトの指定したキーだけを必須にします。すべてを必須にする組み込みの `Required` と違い、`SetRequired` は指定したキーだけを変えます。

```typescript
type Ready = SetRequired<T, K>;
```

## 使用法

### `SetRequired<T, K>`

省略可能だったキーが確実に存在すると分かったあとに使います。チェックを終えたあとなどです。

```typescript
import type { SetRequired } from 'es-toolkit/types';

interface User {
  id: number;
  name: string;
  avatar?: string;
}

// ここから先はアバターが必ず存在します。
type ProfileUser = SetRequired<User, 'avatar'>;
// => { id: number; name: string; avatar: string }

declare function renderProfile(user: ProfileUser): void;

function render(user: User) {
  if (user.avatar != null) {
    renderProfile(user as ProfileUser);
  }
}
```

#### 型パラメータ

- `T`: 変換するオブジェクト型です。
- `K`: 必須にするキーです。`T` のキーである必要があります。
- ユニオンに分配されます。ユニオンを渡すとユニオンのまま返り、それぞれの形が保たれます。
