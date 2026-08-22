# cartesianProduct (`Iterator`)

소스 이터레이터들의 데카르트 곱을 지연 평가 방식으로 계산해요.

```typescript
const pairs = cartesianProduct(source1, source2);
```

## 사용법

### `cartesianProduct(...sources)`

여러 시퀀스에서 가능한 모든 요소 조합이 필요할 때 `cartesianProduct`를 사용하세요. 예를 들어 모든 사용자와 모든 역할을 짝짓거나, 파라미터 집합으로 테스트 케이스를 만들 때요. 튜플은 사전식 순서로 나와요. 배열 버전 [`cartesianProduct`](../../reference/array/cartesianProduct.md)와 마찬가지로, 가장 오른쪽 소스가 주행계 숫자처럼 가장 빠르게 넘어가요.

첫 번째를 제외한 소스들은 여러 번 순회되기 때문에, 순회가 시작될 때 배열로 버퍼링돼요. 첫 번째 소스는 요소를 하나씩 지연 소비하므로 무한 이터레이터여도 괜찮아요. 순회가 끝나면 — 첫 번째 소스가 소진됐든, 다른 소스가 비어 있었든, 소비자가 일찍 멈췄든 — 모든 소스가 `return` 메서드를 통해 닫혀요.

소스를 전달하지 않으면 빈 튜플 하나를 내보내요. 소스 중 하나라도 비어 있으면 아무것도 내보내지 않아요.

```typescript
import { cartesianProduct, range } from 'es-toolkit/iterator';

// 첫 번째 소스의 모든 요소를 두 번째 소스의 모든 요소와 짝지어요.
cartesianProduct([1, 2].values(), ['a', 'b'].values()).toArray();
// 반환 값: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

// 가장 오른쪽 소스가 가장 빠르게 넘어가요.
cartesianProduct([0, 1].values(), [0, 1].values(), [0, 1].values()).toArray();
// 반환 값: [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]]

// 첫 번째 소스는 무한이어도 돼요. 튜플은 필요할 때마다 만들어져요.
cartesianProduct(range(0, Infinity), ['a', 'b'].values()).take(3).toArray();
// 반환 값: [[0, 'a'], [0, 'b'], [1, 'a']]
```

#### 파라미터

- `sources` (`Array<Iterator<unknown>>`): 곱을 계산할 이터레이터들이에요.

#### 반환 값

(`IteratorObject<[...], undefined>`): 데카르트 곱의 튜플을 내보내는 지연 평가 이터레이터예요. 타입은 소스들을 따라 정해져요. 모든 네이티브 이터레이터 헬퍼(`map`, `take`, `toArray`, ...)를 갖추고 있어서 이어서 체이닝할 수 있어요.

### `pipe`와 함께 쓰는 `cartesianProduct(other)`

[`pipe`](../../fp/reference/pipe.md)로 변환을 조합할 때는 `es-toolkit/fp/iterator`에서 커링된 형태를 가져오세요. 다른 이터레이터 하나를 받아서, 파이프로 전달된 이터레이터의 모든 요소를 그 이터레이터의 모든 요소와 짝지어요. 다른 이터레이터 쪽이 더 빠르게 넘어가요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { cartesianProduct, toArray } from 'es-toolkit/fp/iterator';

pipe([1, 2].values(), cartesianProduct(['a', 'b'].values()), toArray());
// 반환 값: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```
