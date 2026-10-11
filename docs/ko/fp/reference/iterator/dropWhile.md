# dropWhile (`Iterator`)

조건을 만족하는 동안 이터레이터의 앞쪽 요소를 지연 평가 방식으로 건너뛰고, 나머지를 내보내는 함수를 만들어요. [`pipe`](../pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, dropWhile(shouldDrop));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 `es-toolkit/iterator`의 [`dropWhile`](../../../reference/iterator/dropWhile.md)을 쓰는 것이 좋아요: `dropWhile(source, shouldDrop)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `dropWhile(shouldDrop)`

`dropWhile`은 조건 함수를 받아서, 조건 함수가 참으로 평가되는 값을 반환하는 동안 요소를 건너뛰는 함수를 반환해요. 조건 함수가 처음으로 거짓으로 평가되는 값을 반환한 요소부터는 남은 요소를 모두 내보내요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { dropWhile, toArray } from 'es-toolkit/fp/iterator';

// 앞쪽에 있는 3보다 작은 숫자들을 건너뛰어요.
pipe(
  [1, 2, 3, 1].values(),
  dropWhile(x => x < 3),
  toArray()
);
// 반환 값: [3, 1]
```

#### 파라미터

- `shouldDrop` (`(value: T, index: number) => boolean`): 각 요소와 인덱스로 호출돼요. 참으로 평가되는 값을 반환하는 동안 요소를 건너뛰어요.

#### 반환 값

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): 이터레이터를, 건너뛴 앞쪽 구간 이후의 요소들을 내보내는 지연 평가 이터레이터로 변환하는 함수예요.
