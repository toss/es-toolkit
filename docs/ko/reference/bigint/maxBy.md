# maxBy (`BigInt`)

배열에서 함수가 계산한 `BigInt` 값이 가장 큰 요소를 반환해요.

```typescript
const largest = maxBy(items, getValue);
```

::: info

이 함수는 다른 숫자 타입의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/bigint`에서만 사용할 수 있어요.

:::

## 사용법

### `maxBy(items, getValue)`

비교하고 싶은 `BigInt`가 객체 안에 있고 숫자가 아니라 객체 전체를 돌려받고 싶을 때 `maxBy`를 사용하세요. 각 요소에서 값을 꺼내는 함수를 넘겨주세요.

```typescript
import { maxBy } from 'es-toolkit/bigint';

const accounts = [
  { owner: 'alice', balance: 10n },
  { owner: 'bob', balance: 30n },
  { owner: 'carol', balance: 20n },
];

const richest = maxBy(accounts, account => account.balance);
console.log(richest); // { owner: 'bob', balance: 30n }
```

가장 큰 값이 여러 개로 같으면, 가장 먼저 나온 요소가 반환돼요. `getValue`는 인덱스와 배열 전체도 함께 받아요.

```typescript
import { maxBy } from 'es-toolkit/bigint';

const first = { id: 'a', score: 30n };
const second = { id: 'b', score: 30n };
console.log(maxBy([first, second], item => item.score)); // { id: 'a', score: 30n }

// 요소와 그 위치를 함께 사용해서 계산한 값으로 비교해요
const rounds = [{ points: 5n }, { points: 5n }, { points: 5n }];
const best = maxBy(rounds, (round, index) => round.points * BigInt(index + 1));
console.log(best); // 세 번째 라운드예요. 곱해지는 값이 가장 크기 때문이에요
```

빈 배열은 반환할 요소가 없기 때문에 에러를 던져요.

```typescript
import { maxBy } from 'es-toolkit/bigint';

maxBy([], () => 0n); // RangeError: Cannot find the maximum of an empty array.
```

#### 파라미터

- `items` (`readonly T[]`): 탐색할 요소 배열이에요.
- `getValue` (`(element: T, index: number, array: readonly T[]) => bigint`): 비교 기준이 되는 `BigInt`를 반환하는 함수예요.

#### 반환 값

(`T`): 계산된 `BigInt`가 가장 큰 요소를 반환해요. 값이 같은 요소가 여러 개면 그중 첫 번째 요소를 반환해요.

#### 에러

배열이 비어 있으면 `RangeError`를 던져요.
