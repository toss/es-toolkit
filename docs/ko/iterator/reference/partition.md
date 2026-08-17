# partition

이터레이터를 소비하고, 요소들을 조건 함수에 따라 두 배열로 나눠요.

```typescript
const [matched, unmatched] = partition(source, predicate);
```

## 사용법

### `partition(source, predicate)`

지연 평가 파이프라인의 요소들을 한 번의 순회로 두 그룹으로 나누고 싶을 때 `partition`을 사용하세요. 예를 들어 유효한 레코드와 유효하지 않은 레코드로 나눌 때요. 첫 번째 배열은 `predicate`가 참으로 평가되는 값을 반환한 요소들을 담고, 두 번째 배열은 나머지를 담아요. 각 그룹 안에서 상대적인 순서는 유지돼요. 이 함수는 파이프라인을 끝내는 종결 연산이에요. 모든 요소를 끝까지 소비하기 때문에, 무한 이터레이터에는 사용하면 안 돼요.

```typescript
import { partition } from 'es-toolkit/iterator';

// 숫자를 짝수와 홀수로 나눠요.
partition([1, 2, 3, 4].values(), x => x % 2 === 0);
// 반환 값: [[2, 4], [1, 3]]

// 각 그룹 안에서 순서가 유지돼요.
partition([3, 1, 4, 1, 5, 9, 2].values(), x => x > 3);
// 반환 값: [[4, 5, 9], [3, 1, 1, 2]]
```

#### 파라미터

- `source` (`Iterator<T>`): 나눌 이터레이터예요.
- `predicate` (`(value: T, index: number) => boolean`): 각 요소와 인덱스로 호출돼요. 참으로 평가되는 값을 반환하면 요소를 첫 번째 배열에 넣어요.

#### 반환 값

(`[T[], T[]]`): `[matched, unmatched]` 배열로 이루어진 두 요소 튜플이에요.

### `pipe`와 함께 쓰는 `partition(predicate)`

[`pipe`](../../fp/reference/pipe.md)로 변환을 조합할 때는 `es-toolkit/fp/iterator`에서 커링된 형태를 가져와서 마지막 단계로 사용하세요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { partition } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 4].values(),
  partition(x => x % 2 === 0)
);
// 반환 값: [[2, 4], [1, 3]]
```
