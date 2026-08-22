# SetOptional

객체에서 원하는 키만 골라 선택적으로 만들어요. 기본 `Partial`이 전부를 선택적으로 만든다면, `SetOptional`은 지정한 키만 바꿔요.

```typescript
type Draft = SetOptional<T, K>;
```

## 사용법

### `SetOptional<T, K>`

객체의 일부만 아직 없을 수 있을 때 사용하세요. 작성 중인 초안 같은 경우예요.

```typescript
import type { SetOptional } from 'es-toolkit/types';

interface Account {
  accountId: string;
  productCode: string;
  nickname: string;
}

// 별칭은 아직 입력하지 않았을 수 있어요.
type AccountDraft = SetOptional<Account, 'nickname'>;
// => { accountId: string; productCode: string; nickname?: string }

const draft: AccountDraft = { accountId: 'a_1', productCode: 'SAVINGS' };

// 여러 키를 한 번에 지정할 수도 있어요.
type PartiallyFilled = SetOptional<Account, 'nickname' | 'productCode'>;
```

#### 타입 파라미터

- `T`: 바꿀 객체 타입이에요.
- `K`: 선택적으로 만들 키예요. `T`의 키여야 해요.
- 유니온에 분배돼요. 그래서 유니온을 넣으면 유니온으로 나오고, 각 갈래가 자기 모양을 그대로 유지해요.
