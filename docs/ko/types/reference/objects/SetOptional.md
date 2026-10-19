# SetOptional

객체에서 고른 키만 선택적으로 바꿔요. `Partial`은 모든 키를 한꺼번에 바꾸지만, `SetOptional`은 지정한 키만 건드려요.

```typescript
type Draft = SetOptional<T, K>;
```

## 사용법

### `SetOptional<T, K>`

아직 값이 채워지지 않은 키가 있을 때 사용하세요. 작성 중인 초안을 다룰 때 자주 써요.

```typescript
import type { SetOptional } from 'es-toolkit/types';

interface Account {
  accountId: string;
  productCode: string;
  nickname: string;
}

// 계좌 이름은 아직 입력하지 않았을 수 있어요.
type AccountDraft = SetOptional<Account, 'nickname'>;
// => { accountId: string; productCode: string; nickname?: string }

const draft: AccountDraft = { accountId: 'a_1', productCode: 'SAVINGS' };

// 여러 키를 한 번에 지정할 수도 있어요.
type PartiallyFilled = SetOptional<Account, 'nickname' | 'productCode'>;
```

`A | B`처럼 여러 타입 중 하나인 값에 써도, 나중에 `if`로 어느 쪽인지 가려낼 수 있어요.

```typescript
type Method = { kind: 'card'; cardNo: string; note: string } | { kind: 'bank'; accountNo: string; note: string };

function f(v: SetOptional<Method, 'note'>) {
  if (v.kind === 'card') {
    return v.cardNo; // 카드 쪽으로 좁혀져요
  }
  return v.accountNo;
}
```

#### 타입 파라미터

- `T`: 바꿀 객체 타입이에요.
- `K`: 선택적으로 만들 키예요. `T`의 키여야 해요.
