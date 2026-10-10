# zip (`Iterator`)

이터레이터의 요소들을 다른 이터레이터의 요소들과 지연 평가 방식으로 짝짓는 함수를 만들어요. [`pipe`](../pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, zip(other));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 `es-toolkit/iterator`의 [`zip`](../../../reference/iterator/zip.md)을 쓰는 것이 좋아요: `zip(source, other)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `zip(other)`

`zip`은 다른 이터레이터 하나를 받아서, 파이프로 전달된 이터레이터의 요소들을 `other`의 요소들과 하나씩 짝짓는 함수를 반환해요. 어느 한쪽 이터레이터라도 끝나면 바로 순회가 멈춰요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, zip } from 'es-toolkit/fp/iterator';

// 각 숫자를 문자와 짝지어요.
pipe([1, 2, 3].values(), zip(['a', 'b', 'c'].values()), toArray());
// 반환 값: [[1, 'a'], [2, 'b'], [3, 'c']]
```

#### 파라미터

- `other` (`Iterator<U>`): 파이프로 전달된 이터레이터와 짝지을 이터레이터예요.

#### 반환 값

(`(source: Iterator<T>) => IteratorObject<[T, U], undefined>`): 이터레이터를, `[element, otherElement]` 쌍을 내보내는 지연 평가 이터레이터로 변환하는 함수예요.
