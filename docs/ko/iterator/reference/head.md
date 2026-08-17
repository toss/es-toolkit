# head (`Iterator`용)

이터레이터의 첫 번째 요소를 반환해요. 비어 있으면 `undefined`를 반환해요.

```typescript
const first = head(source);
```

## 사용법

### `head(source)`

지연 평가 파이프라인이 내보내는 첫 번째 요소만 필요할 때 `head`를 사용하세요. 요소를 하나만 꺼내고 멈추기 때문에, 무한 이터레이터에도 안전하게 쓸 수 있어요.

`head`는 이터레이터를 엿보는 것이 아니라 소비해요. 첫 번째 요소를 읽고 나면 네이티브 `Iterator.prototype.find`와 마찬가지로 소스가 `return` 메서드를 통해 닫혀서, 더 이상 순회할 수 없어요.

```typescript
import { head } from 'es-toolkit/iterator';

// 첫 번째 요소를 읽어요.
head([1, 2, 3].values());
// 반환 값: 1

// 빈 이터레이터는 undefined를 반환해요.
head([].values());
// 반환 값: undefined

// 지연 평가 체인의 앞쪽 요소들만 계산돼요.
head([1, 2, 3, 4].values().filter(x => x % 2 === 0));
// 반환 값: 2
```

#### 파라미터

- `source` (`Iterator<T>`): 첫 번째 요소를 읽을 이터레이터예요.

#### 반환 값

(`T | undefined`): 첫 번째 요소예요. 이터레이터가 아무것도 내보내지 않으면 `undefined`예요.

### `pipe`와 함께 쓰는 `head()`

[`pipe`](../../fp/reference/pipe.md)로 변환을 조합할 때는 `es-toolkit/fp/iterator`에서 커링된 형태를 가져와서 마지막 단계로 사용하세요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, head } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  head()
);
// 반환 값: 2
```
