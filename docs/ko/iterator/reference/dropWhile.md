# dropWhile

조건 함수가 성립하는 동안 이터레이터의 앞쪽 요소를 지연 평가 방식으로 건너뛰고, 나머지를 내보내요.

```typescript
const rest = dropWhile(source, shouldDrop);
```

## 사용법

### `dropWhile(source, shouldDrop)`

정해진 개수가 아니라 조건에 따라 앞쪽 요소들을 건너뛰고 싶을 때 `dropWhile`을 사용하세요. 예를 들어 첫 번째 에러가 나올 때까지 로그 줄을 건너뛸 때요. `shouldDrop`이 참으로 평가되는 값을 반환하는 동안 요소를 건너뛰고, 처음으로 조건을 만족하지 않는 요소부터는 그 요소를 포함해서 모두 내보내요. 네이티브 이터레이터 헬퍼에는 개수 기반의 `drop`은 있지만 조건 기반의 `dropWhile`은 없어서, 이 함수를 제공해요.

```typescript
import { dropWhile } from 'es-toolkit/iterator';

// 앞쪽에 이어지는 작은 숫자들을 건너뛰어요.
dropWhile([1, 2, 3, 1].values(), x => x < 3).toArray();
// 반환 값: [3, 1]

// 첫 요소가 조건을 만족하지 않으면 아무것도 건너뛰지 않아요.
dropWhile([5, 1, 2].values(), x => x < 3).toArray();
// 반환 값: [5, 1, 2]
```

#### 파라미터

- `source` (`Iterator<T>`): 요소를 건너뛸 이터레이터예요.
- `shouldDrop` (`(value: T, index: number) => boolean`): 각 요소와 인덱스로 호출돼요. 참으로 평가되는 값을 반환하는 동안 요소를 건너뛰어요.

#### 반환 값

(`IteratorObject<T, undefined>`): 건너뛴 앞쪽 구간 이후의 요소들을 내보내는 지연 평가 이터레이터예요. 모든 네이티브 이터레이터 헬퍼(`map`, `take`, `toArray`, ...)를 갖추고 있어서 이어서 체이닝할 수 있어요.

### `pipe`와 함께 쓰는 `dropWhile(shouldDrop)`

[`pipe`](../../fp/reference/pipe.md)로 변환을 조합할 때는 `es-toolkit/fp/iterator`에서 커링된 형태를 가져오세요. 조건 함수만 받고, 이터레이터를 받는 함수를 반환해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { dropWhile, toArray } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 1].values(),
  dropWhile(x => x < 3),
  toArray()
);
// 반환 값: [3, 1]
```
