# uniqBy (`Iterator`)

이터레이터의 요소 중 키가 이전에 나온 적 없는 요소들만 지연 평가 방식으로 내보내는 함수를 만들어요. [`pipe`](../pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, uniqBy(getKey));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 `es-toolkit/iterator`의 [`uniqBy`](../../../reference/iterator/uniqBy.md)를 쓰는 것이 좋아요: `uniqBy(source, getKey)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `uniqBy(getKey)`

`uniqBy`는 키 함수를 받아서, 키가 처음 나타난 요소만 원래 순서대로 내보내는 함수를 반환해요. 키는 `Set`이 값을 비교하는 것과 같은 방식으로 비교해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, uniqBy } from 'es-toolkit/fp/iterator';

// 정수 부분마다 첫 번째 숫자만 남겨요.
pipe([1.1, 1.2, 2.3, 2.4].values(), uniqBy(Math.floor), toArray());
// 반환 값: [1.1, 2.3]
```

#### 파라미터

- `getKey` (`(value: T) => K`): 요소를 중복 판별에 사용할 키로 변환해요.

#### 반환 값

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): 이터레이터를, 키가 중복된 요소를 제거하고 내보내는 지연 평가 이터레이터로 변환하는 함수예요.
