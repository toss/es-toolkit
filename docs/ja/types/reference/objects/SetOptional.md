# SetOptional

オブジェクトの指定したキーだけを省略可能にします。すべてを省略可能にする組み込みの `Partial` と違い、`SetOptional` は指定したキーだけを変えます。

```typescript
type Draft = SetOptional<T, K>;
```

## 使用法

### `SetOptional<T, K>`

オブジェクトの一部だけがまだ揃っていない場合に使います。入力途中の下書きなどです。

```typescript
import type { SetOptional } from 'es-toolkit/types';

interface Account {
  accountId: string;
  productCode: string;
  nickname: string;
}

// ニックネームはまだ入力されていないかもしれません。
type AccountDraft = SetOptional<Account, 'nickname'>;
// => { accountId: string; productCode: string; nickname?: string }

const draft: AccountDraft = { accountId: 'a_1', productCode: 'SAVINGS' };

// 複数のキーをまとめて指定できます。
type PartiallyFilled = SetOptional<Account, 'nickname' | 'productCode'>;
```

`A | B` のように複数の型のどれか、という値に使っても、あとから `if` でどちらかを見分けられます。

```typescript
type Method = { kind: 'card'; cardNo: string; note: string } | { kind: 'bank'; accountNo: string; note: string };

function f(v: SetOptional<Method, 'note'>) {
  if (v.kind === 'card') {
    return v.cardNo; // カード側に絞り込まれます
  }
  return v.accountNo;
}
```

#### 型パラメータ

- `T`: 変換するオブジェクト型です。
- `K`: 省略可能にするキーです。`T` のキーである必要があります。
