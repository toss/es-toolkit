# forEach (`Set`)

Set의 각 요소에 대해 제공된 함수를 한 번씩 실행해요.

```typescript
forEach(set, callbackfn);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/set`에서만 사용할 수 있어요.

:::

## 사용법

### `forEach(set, callbackfn)`

Set의 각 요소에 대해 함수를 실행하고 싶을 때 `forEach`를 사용하세요. 콜백 함수는 값을 두 번 (Map.forEach와의 일관성을 위해), 그리고 Set 자체를 인자로 받아요. 로깅, 외부 상태 업데이트, 또는 각 요소에 대한 작업 수행과 같은 부수 효과에 유용해요.

```typescript
import { forEach } from 'es-toolkit/set';

const set = new Set([1, 2, 3]);

forEach(set, value => {
  console.log(value * 2);
});
// 출력:
// 2
// 4
// 6
```

각 요소에 대해 다양한 작업을 수행할 수 있어요.

```typescript
import { forEach } from 'es-toolkit/set';

// 값 누적하기
const numbers = new Set([1, 2, 3, 4, 5]);

let sum = 0;
forEach(numbers, value => {
  sum += value;
});
// sum은 이제 15예요

// 변환과 함께 요소를 배열로 수집하기
const names = new Set(['alice', 'bob', 'charlie']);

const uppercased: string[] = [];
forEach(names, value => {
  uppercased.push(value.toUpperCase());
});
// uppercased: ['ALICE', 'BOB', 'CHARLIE']

// 조건에 따라 외부 Set 업데이트하기
const scores = new Set([85, 92, 78, 95, 88]);

const highScores = new Set<number>();
forEach(scores, value => {
  if (value >= 90) {
    highScores.add(value);
  }
});
// highScores에는 92와 95가 포함돼요

// 객체 처리하기
const users = new Set([
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true },
]);

const activeUserIds: number[] = [];
forEach(users, user => {
  if (user.active) {
    activeUserIds.push(user.id);
  }
});
// activeUserIds: [1, 3]
```

#### 파라미터

- `set` (`Set<T>`): 순회할 Set이에요.
- `callbackfn` (`(value: T, value2: T, set: Set<T>) => void`): 각 요소에 대해 실행할 함수예요.

#### 반환 값

(`void`): 이 함수는 값을 반환하지 않아요.
