# head (`Iterator`)

이터레이터의 첫 번째 요소를 반환하고, 비어 있으면 `undefined`를 반환하는 함수를 만들어요. [`pipe`](../pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, head());
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 `es-toolkit/iterator`의 [`head`](../../../reference/iterator/head.md)를 쓰는 것이 좋아요: `head(source)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `head()`

`head`는 이터레이터 파이프라인을 끝내는 종결 단계예요. 요소를 하나만 꺼낸 뒤 소스 이터레이터를 `return` 메서드를 통해 닫기 때문에, 무한 이터레이터에도 안전하게 쓸 수 있어요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, head } from 'es-toolkit/fp/iterator';

// 첫 번째 짝수를 가져와요.
pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  head()
);
// 반환 값: 2
```

#### 반환 값

(`(source: Iterator<T>) => T | undefined`): 이터레이터의 첫 번째 요소를 반환하고, 이터레이터가 아무것도 내보내지 않으면 `undefined`를 반환하는 함수예요.
