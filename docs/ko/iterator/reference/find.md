# find (함수형 프로그래밍)

조건 함수를 만족하는 이터레이터의 첫 번째 요소를 반환하는 함수를 만들어요. [`pipe`](../../fp/reference/pipe.md)와 같이 사용해요.

```typescript
const result = pipe(source, find(predicate));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 네이티브 [`Iterator.prototype.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator/find)를 쓰는 것이 좋아요: `source.find(predicate)`. `pipe`로 변환을 이어 붙일 때 이 `es-toolkit/fp/iterator` 버전을 사용하세요.

:::

## 사용법

### `find(predicate)`

`find`는 파이프라인을 끝내는 종결 단계예요. `predicate`가 참으로 평가되는 값을 반환할 때까지 이터레이터를 소비하고, 그 요소를 반환해요. 만족하는 요소가 없으면 `undefined`를 반환해요. 첫 번째로 조건을 만족하는 요소에서 소비를 멈추고 소스를 닫기 때문에, 조건을 만족하는 요소가 나타나기만 하면 무한 이터레이터에서도 안전하게 쓸 수 있어요. 네이티브 `Iterator.prototype.find`에 위임해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { find } from 'es-toolkit/fp/iterator';

// 기준값을 넘는 첫 번째 요소를 반환해요.
pipe([1, 2, 3, 4].values(), find(x => x > 2));
// 반환 값: 3

// 조건을 만족하는 요소가 없으면 undefined를 반환해요.
pipe([1, 2].values(), find(x => x > 10));
// 반환 값: undefined
```

#### 파라미터

- `predicate` (`(value: T, index: number) => unknown`): 각 요소와 인덱스로 호출돼요. 참으로 평가되는 값을 반환하면 그 요소가 선택돼요.

#### 반환 값

(`(source: Iterator<T>) => T | undefined`): 이터레이터를 소비하고, 조건을 만족하는 첫 번째 요소 또는 `undefined`를 반환하는 함수예요.
