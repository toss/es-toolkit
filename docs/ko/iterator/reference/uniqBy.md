# uniqBy (`Iterator`)

변환한 키가 이전에 나온 적 없는 이터레이터의 요소들만 지연 평가 방식으로 내보내요.

```typescript
const unique = uniqBy(source, getKey);
```

## 사용법

### `uniqBy(source, getKey)`

요소 스트림에서 파생된 키를 기준으로 중복을 제거하고 싶을 때 `uniqBy`를 사용하세요. 예를 들어 사용자 ID별로 첫 번째 이벤트만 남길 때요. 처음 나타난 순서가 유지되고, 키는 SameValueZero 방식(`Set`과 동일)으로 비교되기 때문에 `NaN` 키도 중복 제거돼요. 중복 제거는 스트리밍으로 동작해요. 각 요소는 유일하다고 판단되는 즉시 내보내지기 때문에, 일찍 멈추는 헬퍼로 범위를 제한하면 무한 이터레이터에도 사용할 수 있어요.

```typescript
import { uniqBy } from 'es-toolkit/iterator';

// 변환한 키마다 첫 번째 요소만 남겨요.
uniqBy([1.1, 1.2, 2.3, 2.4].values(), Math.floor).toArray();
// 반환 값: [1.1, 2.3]

// 파생된 키로 객체의 중복을 제거해요.
const events = [
  { userId: 1, type: 'click' },
  { userId: 1, type: 'view' },
  { userId: 2, type: 'click' },
];
uniqBy(events.values(), e => e.userId).toArray();
// 반환 값: [{ userId: 1, type: 'click' }, { userId: 2, type: 'click' }]
```

#### 파라미터

- `source` (`Iterator<T>`): 중복을 제거할 이터레이터예요.
- `getKey` (`(value: T) => K`): 요소를 중복 판별에 사용할 키로 변환해요.

#### 반환 값

(`IteratorObject<T, undefined>`): 중복된 키를 가진 요소가 제거된 요소들을 내보내는 지연 평가 이터레이터예요. 모든 네이티브 이터레이터 헬퍼(`map`, `take`, `toArray`, ...)를 갖추고 있어서 이어서 체이닝할 수 있어요.

### `pipe`와 함께 쓰는 `uniqBy(getKey)`

[`pipe`](../../fp/reference/pipe.md)로 변환을 조합할 때는 `es-toolkit/fp/iterator`에서 커링된 형태를 가져오세요. 키 함수만 받고, 이터레이터를 받는 함수를 반환해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, uniqBy } from 'es-toolkit/fp/iterator';

pipe([1.1, 1.2, 2.3, 2.4].values(), uniqBy(Math.floor), toArray());
// 반환 값: [1.1, 2.3]
```
