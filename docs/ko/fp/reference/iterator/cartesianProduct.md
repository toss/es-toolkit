# cartesianProduct (`Iterator`)

이터레이터와 다른 이터레이터의 데카르트 곱을 지연 평가 방식으로 계산하는 함수를 만들어요. [`pipe`](../pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, cartesianProduct(other));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 `es-toolkit/iterator`의 [`cartesianProduct`](../../../reference/iterator/cartesianProduct.md)를 쓰는 것이 좋아요: `cartesianProduct(source, other)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `cartesianProduct(other)`

`cartesianProduct`는 다른 이터레이터 하나를 받아서, 파이프로 전달된 이터레이터의 모든 요소를 `other`의 모든 요소와 짝짓는 함수를 반환해요. `other`가 주행계 숫자처럼 가장 빠르게 넘어가요. 순회가 시작되면 `other`는 배열로 한 번에 읽어 두지만, 파이프로 전달된 이터레이터는 필요할 때마다 읽어요. 그래서 파이프로 전달된 이터레이터는 무한 이터레이터여도 괜찮아요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { cartesianProduct, toArray } from 'es-toolkit/fp/iterator';

// 모든 숫자를 모든 문자와 짝지어요.
pipe([1, 2].values(), cartesianProduct(['a', 'b'].values()), toArray());
// 반환 값: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```

#### 파라미터

- `other` (`Iterator<U>`): 함께 곱을 계산할 이터레이터예요.

#### 반환 값

(`(source: Iterator<T>) => IteratorObject<[T, U], undefined>`): 이터레이터를, `[element, otherElement]` 쌍을 내보내는 지연 평가 이터레이터로 변환하는 함수예요.
