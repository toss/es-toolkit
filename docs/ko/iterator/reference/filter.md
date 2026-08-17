# filter (`Iterator`용)

조건 함수를 만족하는 이터레이터의 요소만 지연 평가 방식으로 남기는 함수를 만들어요. [`pipe`](../../fp/reference/pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, filter(predicate));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 네이티브 [`Iterator.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/filter)를 쓰는 것이 좋아요: `source.filter(predicate)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `filter(predicate)`

`filter`는 조건 함수를 받아서, 조건 함수가 참으로 평가되는 값을 반환하는 요소만 지연 평가 방식으로 남기는 함수를 반환해요. 조건 함수가 타입 가드(`(value): value is S`)이면 요소 타입이 그에 맞게 좁혀져요. 네이티브 `Iterator.prototype.filter`에 위임해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, toArray } from 'es-toolkit/fp/iterator';

// 짝수만 남겨요.
pipe([1, 2, 3, 4].values(), filter(x => x % 2 === 0), toArray());
// 반환 값: [2, 4]
```

#### 파라미터

- `predicate` (`(value: T, index: number) => unknown`): 각 요소와 인덱스로 호출돼요. 참으로 평가되는 값을 반환하면 그 요소를 남겨요.

#### 반환 값

(`(source: Iterator<T>) => IteratorObject<T, undefined>`): 이터레이터를, 남긴 요소들을 내보내는 지연 평가 이터레이터로 변환하는 함수예요.
