# some (`Iterator`)

이터레이터의 요소 중 하나라도 조건 함수를 만족하는지 알려주는 함수를 만들어요. [`pipe`](../../fp/reference/pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, some(predicate));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 네이티브 [`Iterator.prototype.some`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/some)을 쓰는 것이 좋아요: `source.some(predicate)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `some(predicate)`

`some`은 파이프라인을 끝내는 종결 단계예요. `predicate`가 참으로 평가되는 값을 반환할 때까지 이터레이터를 소비하고, 조건을 만족한 요소가 있었는지 알려줘요. 처음으로 조건을 만족하는 요소에서 소비를 멈추기 때문에, 조건을 만족하는 요소가 나타나기만 하면 무한 이터레이터에서도 완료될 수 있어요. 네이티브 `Iterator.prototype.some`에 위임해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { some } from 'es-toolkit/fp/iterator';

// 짝수를 찾는 즉시 멈춰요.
pipe(
  [1, 3, 4, 5].values(),
  some(x => x % 2 === 0)
);
// 반환 값: true

pipe(
  [1, 3, 5].values(),
  some(x => x % 2 === 0)
);
// 반환 값: false
```

#### 파라미터

- `predicate` (`(value: T, index: number) => unknown`): 각 요소와 인덱스로 호출돼요. 참으로 평가되는 값을 반환하면 즉시 `true`로 끝나요.

#### 반환 값

(`(source: Iterator<T>) => boolean`): 이터레이터를 소비하고, 조건을 만족한 요소가 있었는지 반환하는 함수예요.
