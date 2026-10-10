# count (`Iterator`)

이터레이터를 소비하고, 이터레이터가 내보내는 요소의 개수를 반환하는 함수를 만들어요. [`pipe`](../pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, count());
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 `es-toolkit/iterator`의 [`count`](../../../reference/iterator/count.md)를 쓰는 것이 좋아요: `count(source)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `count()`

`count`는 이터레이터 파이프라인을 끝내는 종결 단계예요. 모든 요소를 꺼내고, 요소가 몇 개였는지 반환해요. 이터레이터 전체를 소비하기 때문에, 무한 이터레이터에는 사용하면 안 돼요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { count, filter } from 'es-toolkit/fp/iterator';

// 짝수의 개수를 세요.
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  count()
);
// 반환 값: 2
```

#### 반환 값

(`(source: Iterator<T>) => number`): 이터레이터를 소비하고, 이터레이터가 내보낸 요소의 개수를 반환하는 함수예요.
