# takeWhile (`Iterator`)

조건을 만족하는 동안 이터레이터의 앞쪽 요소들을 지연 평가 방식으로 내보내는 함수를 만들어요. [`pipe`](../pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, takeWhile(shouldContinue));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 `es-toolkit/iterator`의 [`takeWhile`](../../../reference/iterator/takeWhile.md)을 쓰는 것이 좋아요: `takeWhile(source, shouldContinue)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `takeWhile(shouldContinue)`

`takeWhile`은 조건 함수를 받아서, 조건 함수가 참으로 평가되는 값을 반환하는 동안 요소를 내보내는 함수를 반환해요. 처음으로 거짓으로 평가되는 값을 반환한 요소에서 순회를 멈추고, 남은 요소는 소스에서 아예 꺼내지 않아요. 그래서 무한 이터레이터의 범위를 제한할 수 있어요. 조건 대신 정해진 개수만큼 가져온 뒤 멈추려면 [`take`](./take.md)를 사용하세요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { takeWhile, toArray } from 'es-toolkit/fp/iterator';

// 앞쪽에 있는 3보다 작은 숫자들을 가져와요.
pipe(
  [1, 2, 3, 1].values(),
  takeWhile(x => x < 3),
  toArray()
);
// 반환 값: [1, 2]
```

#### 파라미터

- `shouldContinue` (`(value: T, index: number) => boolean`): 각 요소와 인덱스로 호출돼요. 거짓으로 평가되는 값을 반환하면 순회가 멈춰요.

#### 반환 값

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): 이터레이터를, 조건을 만족하는 앞쪽 구간의 요소들을 내보내는 지연 평가 이터레이터로 변환하는 함수예요.
