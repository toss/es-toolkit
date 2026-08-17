# count

이터레이터를 소비하고, 이터레이터가 내보내는 요소의 개수를 반환해요.

```typescript
const total = count(source);
```

## 사용법

### `count(source)`

지연 평가 파이프라인이 내보내는 요소가 몇 개인지, 요소를 모으지 않고 알고 싶을 때 `count`를 사용하세요. `source.toArray().length`와 달리 배열을 할당하지 않고 개수를 세요. 이 함수는 파이프라인을 끝내는 종결 연산이에요. 모든 요소를 끝까지 소비하기 때문에, 무한 이터레이터에는 사용하면 안 돼요.

```typescript
import { count } from 'es-toolkit/iterator';

// 이터레이터의 요소 개수를 세요.
count([1, 2, 3].values());
// 반환 값: 3

// 지연 평가 체인을 거치고 남은 요소의 개수를 세요.
count([1, 2, 3, 4, 5].values().filter(x => x % 2 === 1));
// 반환 값: 3
```

#### 파라미터

- `source` (`Iterator<T>`): 개수를 셀 이터레이터예요.

#### 반환 값

(`number`): `source`가 내보낸 요소의 개수예요.

### `pipe`와 함께 쓰는 `count()`

[`pipe`](../../fp/reference/pipe.md)로 변환을 조합할 때는 `es-toolkit/fp/iterator`에서 커링된 형태를 가져와서 마지막 단계로 사용하세요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { count, filter } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  count()
);
// 반환 값: 2
```
