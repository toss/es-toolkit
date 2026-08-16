# medianBy (`BigInt`)

배열의 각 요소에서 함수가 계산한 `BigInt` 값들의 중앙값을 반환해요.

```typescript
const middle = medianBy(items, getValue);
```

::: info

이 함수는 다른 숫자 타입의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/bigint`에서만 사용할 수 있어요.

:::

## 사용법

### `medianBy(items, getValue)`

중앙값을 구하고 싶은 `BigInt`가 객체 안에 있을 때 `medianBy`를 사용하세요. 각 요소에서 값을 꺼내는 함수를 넘겨주면, 그 함수가 반환한 값들의 중앙값을 구해줘요.

```typescript
import { medianBy } from 'es-toolkit/bigint';

const accounts = [{ balance: 10n }, { balance: 30n }, { balance: 20n }];
const middle = medianBy(accounts, account => account.balance);
console.log(middle); // 20n
```

`median`과 마찬가지로, 요소 개수가 짝수면 가운데 두 값의 평균을 0 방향으로 버리고, 빈 배열이면 에러를 던져요.

```typescript
import { medianBy } from 'es-toolkit/bigint';

const payments = [{ amount: 1n }, { amount: 2n }, { amount: 3n }, { amount: 4n }];
console.log(medianBy(payments, payment => payment.amount)); // 2n

medianBy([], () => 0n); // RangeError: Cannot compute the median of an empty array.
```

#### 파라미터

- `items` (`readonly T[]`): 중앙값을 계산할 요소 배열이에요.
- `getValue` (`(element: T) => bigint`): 각 요소에 사용할 `BigInt`를 반환하는 함수예요.

#### 반환 값

(`bigint`): `getValue`가 반환한 모든 값의 중앙값을 반환해요. 요소 개수가 짝수면 가운데 두 값의 평균을 0 방향으로 버린 값을 반환해요.

#### 에러

배열이 비어 있으면 `RangeError`를 던져요.
