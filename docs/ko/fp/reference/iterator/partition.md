# partition (`Iterator`)

이터레이터를 소비하고, 요소들을 조건 함수에 따라 두 배열로 나누는 함수를 만들어요. [`pipe`](../pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, partition(predicate));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 `es-toolkit/iterator`의 [`partition`](../../../reference/iterator/partition.md)을 쓰는 것이 좋아요: `partition(source, predicate)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `partition(predicate)`

`partition`은 이터레이터 파이프라인을 끝내는 종결 단계예요. 모든 요소를 꺼내서, `predicate`가 참으로 평가되는 값을 반환하면 첫 번째 배열에, 그렇지 않으면 두 번째 배열에 넣어요. 이터레이터 전체를 소비하기 때문에, 무한 이터레이터에는 사용하면 안 돼요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { partition } from 'es-toolkit/fp/iterator';

// 숫자를 짝수와 홀수로 나눠요.
pipe(
  [1, 2, 3, 4].values(),
  partition(x => x % 2 === 0)
);
// 반환 값: [[2, 4], [1, 3]]
```

#### 파라미터

- `predicate` (`(value: T, index: number) => boolean`): 각 요소와 인덱스로 호출돼요. 참으로 평가되는 값을 반환하면 요소를 첫 번째 배열에 넣어요.

#### 반환 값

(`(source: Iterator<T>) => [T[], T[]]`): 이터레이터를 소비하고, `[matched, unmatched]` 배열로 이루어진 튜플을 반환하는 함수예요.
