# sumBy (`BigInt`)

배열의 각 요소에서 함수가 계산한 `BigInt` 값들의 합계를 반환해요.

```typescript
const total = sumBy(items, getValue);
```

::: info

이 함수는 다른 숫자 타입의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/bigint`에서만 사용할 수 있어요.

:::

## 사용법

### `sumBy(items, getValue)`

더하고 싶은 `BigInt`가 객체 안에 있을 때 `sumBy`를 사용하세요. 각 요소에서 값을 꺼내는 함수를 넘겨주면, 그 함수가 반환한 값들을 모두 더해줘요.

```typescript
import { sumBy } from 'es-toolkit/bigint';

// 각 객체의 특정 필드를 더해요
const accounts = [{ balance: 10n }, { balance: 20n }, { balance: 30n }];
const total = sumBy(accounts, account => account.balance);
console.log(total); // 60n

// 두 번째 인자로 인덱스가 전달돼요
const weights = sumBy(['a', 'b', 'c'], (_, index) => BigInt(index));
console.log(weights); // 3n
```

빈 배열은 `0n`을 반환하고, 값은 음수여도 괜찮아요.

```typescript
import { sumBy } from 'es-toolkit/bigint';

console.log(sumBy([], () => 1n)); // 0n

const entries = [{ amount: -500n }, { amount: 1200n }, { amount: -200n }];
console.log(sumBy(entries, entry => entry.amount)); // 500n
```

#### 파라미터

- `items` (`readonly T[]`): 합계를 계산할 요소 배열이에요.
- `getValue` (`(element: T, index: number) => bigint`): 각 요소에서 더할 `BigInt`를 반환하는 함수예요.

#### 반환 값

(`bigint`): `getValue`가 반환한 모든 값의 합계를 반환해요. 빈 배열인 경우 `0n`을 반환해요.
