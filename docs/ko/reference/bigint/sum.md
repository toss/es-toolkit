# sum (`BigInt`)

`BigInt` 배열의 모든 요소를 더한 합계를 반환해요.

```typescript
const total = sum(numbers);
```

::: info

이 함수는 다른 숫자 타입의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/bigint`에서만 사용할 수 있어요.

:::

## 사용법

### `sum(nums)`

`BigInt`들을 더하고 싶을 때 `sum`을 사용하세요. 배열의 모든 요소를 더해서 총합을 반환해요.

```typescript
import { sum } from 'es-toolkit/bigint';

// 기본적인 합계
const numbers = [1n, 2n, 3n, 4n, 5n];
const total = sum(numbers);
console.log(total); // 15n

// 음수와 양수 섞인 합계
const values = [-10n, 5n, -3n, 8n];
const result = sum(values);
console.log(result); // 0n
```

빈 배열은 `0n`을 반환하기 때문에, 배열을 나눠서 각각 더한 값은 전체를 한 번에 더한 값과 항상 같아요.

```typescript
import { sum } from 'es-toolkit/bigint';

const empty = sum([]);
console.log(empty); // 0n

const first = [1n, 2n];
const second = [3n, 4n];
console.log(sum(first) + sum(second) === sum([...first, ...second])); // true
```

`number`와 달리 `BigInt`는 값이 아무리 커져도 정확하기 때문에, 최소 화폐 단위로 저장한 금액이나 토큰 수량, 데이터베이스 식별자를 다루기에 적합해요.

```typescript
import { sum } from 'es-toolkit/bigint';

// Number.MAX_SAFE_INTEGER를 훨씬 넘어서도 여전히 정확해요
const balances = [9007199254740993n, 9007199254740993n];
console.log(sum(balances)); // 18014398509481986n

// 최소 화폐 단위로 저장한 결제 금액의 총합
const paymentsInCents = [129999n, 4550n, 87500n];
console.log(sum(paymentsInCents)); // 222049n
```

#### 파라미터

- `nums` (`readonly bigint[]`): 합계를 계산할 `BigInt` 배열이에요.

#### 반환 값

(`bigint`): 배열에 있는 모든 `BigInt`의 합계를 반환해요. 빈 배열인 경우 `0n`을 반환해요.
