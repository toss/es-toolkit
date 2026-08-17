# zip (`Iterator`용)

여러 이터레이터를 튜플을 내보내는 하나의 이터레이터로 지연 평가 방식으로 합쳐요.

```typescript
const pairs = zip(source1, source2);
```

## 사용법

### `zip(...sources)`

여러 시퀀스를 나란히 순회하고 싶을 때 `zip`을 사용하세요. 예를 들어 인덱스와 값, 이름과 점수를 짝지을 때요. 같은 위치의 요소들이 튜플로 합쳐지고, **가장 짧은** 소스가 소진되는 즉시 순회가 멈춰요. 배열 버전 [`zip`](../../reference/array/zip.md)처럼 가장 긴 소스에 맞춰 채우는 대신 가장 짧은 소스에서 멈추기 때문에, 유한 이터레이터와 무한 이터레이터를 안전하게 조합할 수 있어요. 순회가 끝나면 — 소스가 소진됐든 소비자가 일찍 멈췄든 — 모든 소스가 `return` 메서드를 통해 닫혀요.

```typescript
import { zip } from 'es-toolkit/iterator';

// 같은 위치의 요소들을 짝지어요.
zip([1, 2, 3].values(), ['a', 'b', 'c'].values()).toArray();
// 반환 값: [[1, 'a'], [2, 'b'], [3, 'c']]

// 가장 짧은 소스가 결과의 길이를 정해요.
zip([1, 2, 3].values(), ['a', 'b'].values()).toArray();
// 반환 값: [[1, 'a'], [2, 'b']]

// 끝없는 카운터로 임의의 시퀀스에 번호를 매겨요.
import { range } from 'es-toolkit/iterator';

zip(range(0, Infinity), ['a', 'b', 'c'].values()).toArray();
// 반환 값: [[0, 'a'], [1, 'b'], [2, 'c']]
```

#### 파라미터

- `sources` (`Array<Iterator<unknown>>`): 합칠 이터레이터들이에요.

#### 반환 값

(`IteratorObject<[...], undefined>`): 짝지어진 요소들의 튜플을 내보내는 지연 평가 이터레이터예요. 타입은 소스들을 따라 정해져요. 모든 네이티브 이터레이터 헬퍼(`map`, `take`, `toArray`, ...)를 갖추고 있어서 이어서 체이닝할 수 있어요.

### `pipe`와 함께 쓰는 `zip(other)`

[`pipe`](../../fp/reference/pipe.md)로 변환을 조합할 때는 `es-toolkit/fp/iterator`에서 커링된 형태를 가져오세요. 다른 이터레이터 하나를 받아서, 파이프로 전달된 이터레이터의 요소들과 짝지어요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, zip } from 'es-toolkit/fp/iterator';

pipe([1, 2, 3].values(), zip(['a', 'b', 'c'].values()), toArray());
// 반환 값: [[1, 'a'], [2, 'b'], [3, 'c']]
```
