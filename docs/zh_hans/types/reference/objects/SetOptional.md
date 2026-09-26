# SetOptional

把对象中指定的键变为可选，其余保持不变。与把全部变为可选的内置 `Partial` 不同，`SetOptional` 只改动指定的键。

```typescript
type Draft = SetOptional<T, K>;
```

## 用法

### `SetOptional<T, K>`

当对象只有一部分可能缺失时使用，例如仍在填写中的草稿。

```typescript
import type { SetOptional } from 'es-toolkit/types';

interface Account {
  accountId: string;
  productCode: string;
  nickname: string;
}

// 昵称可能还没填。
type AccountDraft = SetOptional<Account, 'nickname'>;
// => { accountId: string; productCode: string; nickname?: string }

const draft: AccountDraft = { accountId: 'a_1', productCode: 'SAVINGS' };

// 也可以一次指定多个键。
type PartiallyFilled = SetOptional<Account, 'nickname' | 'productCode'>;
```

即使用在 `A | B` 这样「多个类型之一」的值上，之后也能用 `if` 分辨出是哪一个。

```typescript
type Method = { kind: 'card'; cardNo: string; note: string } | { kind: 'bank'; accountNo: string; note: string };

function f(v: SetOptional<Method, 'note'>) {
  if (v.kind === 'card') {
    return v.cardNo; // 收窄到卡片这一侧
  }
  return v.accountNo;
}
```

#### 类型参数

- `T`：要转换的对象类型。
- `K`：要变为可选的键，必须是 `T` 的键。
