# reduce (`Set`)

Set의 요소를 순회하며 콜백 함수를 적용하여 하나의 값으로 줄여요.

```typescript
const result = reduce(set, callback, initialValue);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/set`에서만 사용할 수 있어요.

:::

## 사용법

### `reduce(set, callback, initialValue?)`

Set의 각 요소에서 결과를 누적하여 하나의 값으로 변환하고 싶을 때 `reduce`를 사용하세요. 각 요소를 처리하고 누산기를 업데이트하는 콜백 함수를 제공하세요. 초기값이 제공되면 누산기의 시작값으로 사용돼요. 초기값이 제공되지 않고 Set이 비어있으면 TypeError가 발생해요.

```typescript
import { reduce } from 'es-toolkit/set';

const set = new Set([1, 2, 3]);

const result = reduce(set, (acc, value) => acc + value, 0);
// 결과: 6
```

다양한 방법으로 Set을 줄일 수 있어요.

```typescript
import { reduce } from 'es-toolkit/set';

// 초기값과 함께 합계 계산해요.
const numbers = new Set([10, 20, 30, 40]);

const total = reduce(numbers, (acc, num) => acc + num, 0);
// 결과: 100

// 초기값 없이 (첫 번째 요소 사용)
const values = new Set([5, 10]);

const sum = reduce(values, (acc, value) => acc + value);
// 결과: 15 (첫 번째 값 5부터 시작)

// Set에서 배열 만들기
const uniqueNames = new Set(['Alice', 'Bob', 'Charlie']);

const nameList = reduce(
  uniqueNames,
  (acc, name) => [...acc, name.toUpperCase()],
  [] as string[]
);
// 결과: ['ALICE', 'BOB', 'CHARLIE']
```

#### 파라미터

- `set` (`Set<T>`): 줄일 Set이에요.
- `callback` (`(accumulator: A, value: T, value2: T, set: Set<T>) => A`): 각 요소를 처리하고 누산기를 업데이트하는 함수예요.
- `initialValue` (`A`, 선택): 누산기의 초기값이에요. 제공되지 않으면 Set의 첫 번째 요소를 사용해요.

#### 반환 값

(`A`): 최종 누적된 값을 반환해요.

#### 예외

(`TypeError`): Set이 비어있고 초기값이 제공되지 않으면 발생해요.
