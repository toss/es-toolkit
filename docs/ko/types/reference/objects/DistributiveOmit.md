# DistributiveOmit

유니온의 각 멤버에서 지정한 키를 제거하고 나머지 속성을 유지해요.

```typescript
type WithoutKeys = DistributiveOmit<T, K>;
```

## 사용법

### `DistributiveOmit<T, K>`

유니온에서 속성을 제거하면서 각 멤버에만 있는 속성을 유지하고 싶을 때 사용해요. 기본 `Omit`은 모든 멤버에 공통으로 있는 키만 유지하지만, `DistributiveOmit`은 각 멤버에서 개별적으로 키를 제거해요.

```typescript
import type { DistributiveOmit } from 'es-toolkit/types';

type Card = { kind: 'card'; cardNo: string; note: string };
type Bank = { kind: 'bank'; accountNo: string; note: string };

type Payment = DistributiveOmit<Card | Bank, 'note'>;
// => { kind: 'card'; cardNo: string } | { kind: 'bank'; accountNo: string }

type BuiltInPayment = Omit<Card | Bank, 'note'>;
// => { kind: 'card' | 'bank' }

type WithoutCardNo = DistributiveOmit<Card | Bank, 'note' | 'cardNo'>;
// => { kind: 'card' } | { kind: 'bank'; accountNo: string }
```

멤버에 존재하지 않는 키는 무시해요. 나머지 속성의 `readonly`와 선택적 속성 표시는 유지해요. `T`가 `never`이면 `never`를 반환하고, `K`가 `never`이면 아무 키도 제거하지 않아요.

#### 타입 파라미터

- `T`: 속성을 제거할 타입이에요. 유니온은 멤버별로 처리해요.
- `K`: 제거할 키예요. 여러 키를 유니온으로 지정할 수 있고, 일부 멤버에만 존재하는 키도 지정할 수 있어요. 이 파라미터에는 제약이 없으며, `K`에 할당할 수 있는 키를 제거해요.
