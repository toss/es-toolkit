# chunk (`Iterator`)

이터레이터의 요소들을 지연 평가 방식으로 주어진 길이만큼씩 배열로 묶는 함수를 만들어요. [`pipe`](../pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, chunk(size));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 `es-toolkit/iterator`의 [`chunk`](../../../reference/iterator/chunk.md)를 쓰는 것이 좋아요: `chunk(source, size)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `chunk(size)`

`chunk`는 길이를 받아서, 이터레이터의 요소들을 그 길이의 배열로 묶는 함수를 반환해요. 각 배열은 실제로 꺼내질 때만 만들어지고, 마지막 배열은 더 짧을 수 있어요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { chunk, toArray } from 'es-toolkit/fp/iterator';

// 숫자를 둘씩 묶어요.
pipe([1, 2, 3, 4, 5].values(), chunk(2), toArray());
// 반환 값: [[1, 2], [3, 4], [5]]
```

#### 파라미터

- `size` (`number`): 각 묶음의 길이예요. 0보다 큰 정수여야 해요.

#### 반환 값

(`(source: Iterator<T>) => IteratorObject<T[], undefined>`): 이터레이터를, 최대 `size`개 요소를 가진 배열들을 내보내는 지연 평가 이터레이터로 변환하는 함수예요.

#### 에러

`size`가 0보다 큰 정수가 아니면 에러를 던져요.
