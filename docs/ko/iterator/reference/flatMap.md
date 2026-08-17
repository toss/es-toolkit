# flatMap (함수형 프로그래밍)

이터레이터의 각 요소를 이터러블로 변환하고 결과를 한 단계 평탄화하는 함수를 지연 평가 방식으로 만들어요. [`pipe`](../../fp/reference/pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, flatMap(callback));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 네이티브 [`Iterator.prototype.flatMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/flatMap)을 쓰는 것이 좋아요: `source.flatMap(callback)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `flatMap(callback)`

`flatMap`은 각 요소를 이터러블(또는 이터레이터)로 변환하고, 그 이터러블의 요소들을 그 자리에서 한 단계 깊이로 내보내요. 각 내부 이터러블은 요소가 실제로 꺼내질 때만 순회되기 때문에, 파이프라인 전체가 지연 평가로 유지돼요. 네이티브 `Iterator.prototype.flatMap`에 위임해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { flatMap, toArray } from 'es-toolkit/fp/iterator';

// 각 요소를 자기 자신과 10배한 값으로 펼쳐요.
pipe([1, 2].values(), flatMap(x => [x, x * 10]), toArray());
// 반환 값: [1, 10, 2, 20]
```

#### 파라미터

- `callback` (`(value: T, index: number) => Iterator<U> | Iterable<U>`): 각 요소와 인덱스로 호출돼요. 결과로 평탄화할 이터러블을 반환해요.

#### 반환 값

(`(source: Iterator<T>) => IteratorObject<U, undefined>`): 이터레이터를, 평탄화된 요소들을 내보내는 지연 평가 이터레이터로 변환하는 함수예요.
