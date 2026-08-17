# takeWhile (`Iterator`용)

조건 함수가 성립하는 동안 이터레이터의 앞쪽 요소들을 지연 평가 방식으로 내보내요.

```typescript
const leading = takeWhile(source, shouldContinue);
```

## 사용법

### `takeWhile(source, shouldContinue)`

정해진 개수가 아니라 조건에 따라 소비를 멈추고 싶을 때 `takeWhile`을 사용하세요. 예를 들어 첫 번째 이상치가 나올 때까지 측정값을 읽을 때요. `shouldContinue`가 참으로 평가되는 값을 반환하는 동안 요소를 내보내고, 처음으로 거짓으로 평가되는 값을 반환한 요소에서 순회를 멈춰요(그 요소는 제외돼요). 남은 요소들은 소스에서 아예 꺼내지지 않아요. 그래서 무한 이터레이터의 범위를 안전하게 제한할 수 있어요. 네이티브 이터레이터 헬퍼에는 개수 기반의 `take`는 있지만 조건 기반의 `takeWhile`은 없어서, 이 함수를 제공해요.

```typescript
import { takeWhile } from 'es-toolkit/iterator';

// 앞쪽에 이어지는 작은 숫자들을 내보내요.
takeWhile([1, 2, 3, 4, 1].values(), x => x < 3).toArray();
// 반환 값: [1, 2]

// 무한 시퀀스를 조건으로 제한해요.
import { iterate } from 'es-toolkit/iterator';

takeWhile(iterate(1, x => x * 2), x => x < 100).toArray();
// 반환 값: [1, 2, 4, 8, 16, 32, 64]
```

#### 파라미터

- `source` (`Iterator<T>`): 요소를 가져올 이터레이터예요.
- `shouldContinue` (`(value: T, index: number) => boolean`): 각 요소와 인덱스로 호출돼요. 거짓으로 평가되는 값을 반환하면 순회가 멈춰요.

#### 반환 값

(`IteratorObject<T, undefined>`): 조건을 만족하는 앞쪽 구간의 요소들을 내보내는 지연 평가 이터레이터예요. 모든 네이티브 이터레이터 헬퍼(`map`, `take`, `toArray`, ...)를 갖추고 있어서 이어서 체이닝할 수 있어요.

### `pipe`와 함께 쓰는 `takeWhile(shouldContinue)`

[`pipe`](../../fp/reference/pipe.md)로 변환을 조합할 때는 `es-toolkit/fp/iterator`에서 커링된 형태를 가져오세요. 조건 함수만 받고, 이터레이터를 받는 함수를 반환해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { takeWhile, toArray } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 1].values(),
  takeWhile(x => x < 3),
  toArray()
);
// 반환 값: [1, 2]
```
