# take (함수형 프로그래밍)

이터레이터의 처음 `limit`개 요소를 지연 평가 방식으로 내보내는 함수를 만들어요. [`pipe`](../../fp/reference/pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, take(limit));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 네이티브 [`Iterator.prototype.take`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/take)를 쓰는 것이 좋아요: `source.take(limit)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `take(limit)`

`take`는 파이프라인을 최대 `limit`개 요소로 제한해요. 제한에 도달하면 소스가 닫히고 더 이상 요소를 꺼내지 않기 때문에, 무한 이터레이터의 유한한 앞부분을 소비하는 표준적인 방법이에요. 네이티브 `Iterator.prototype.take`에 위임해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { map, take, toArray } from 'es-toolkit/fp/iterator';

// 처음 세 요소만 변환돼요.
pipe([1, 2, 3, 4, 5].values(), map(x => x * 2), take(3), toArray());
// 반환 값: [2, 4, 6]
```

#### 파라미터

- `limit` (`number`): 내보낼 요소의 최대 개수예요. 음수가 아닌 숫자여야 해요.

#### 반환 값

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): 이터레이터를, 최대 `limit`개의 앞쪽 요소들을 내보내는 지연 평가 이터레이터로 변환하는 함수예요.

#### 에러

`limit`이 음수이거나 `NaN`이면 `RangeError`를 던져요(네이티브 동작).
