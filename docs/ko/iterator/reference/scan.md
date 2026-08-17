# scan (`Iterator`)

이터레이터의 누적 과정을 지연 평가 방식으로 내보내요. 모든 중간 결과를 내보내는 `reduce`라고 할 수 있어요.

```typescript
const accumulated = scan(source, callback, initial);
```

## 사용법

### `scan(source, callback, initial)`

마지막 값만이 아니라 누적의 모든 중간 값이 필요할 때 `scan`을 사용하세요. 누적 합계, 누적 최댓값, 상태 기계 같은 것들이요. `initial` 값이 먼저 내보내지고, 그 뒤로 각 요소를 처리한 뒤의 누적값이 이어지기 때문에, 길이가 `n`인 입력은 `n + 1`개의 값을 만들어요. 이 "scan-left" 동작은 네이티브 이터레이터 헬퍼에 대응되는 것이 없어요.

```typescript
import { scan } from 'es-toolkit/iterator';

// 초기값부터 시작하는 누적 합계.
scan([1, 2, 3].values(), (acc, x) => acc + x, 0).toArray();
// 반환 값: [0, 1, 3, 6]

// 누적값은 요소와 다른 타입일 수 있어요.
scan(['a', 'b'].values(), (acc, x) => acc + x, '').toArray();
// 반환 값: ['', 'a', 'ab']
```

#### 파라미터

- `source` (`Iterator<T>`): 누적할 이터레이터예요.
- `callback` (`(accumulator: U, value: T, index: number) => U`): 현재 누적값, 각 요소, 인덱스로 호출돼요. 다음 누적값을 반환해요.
- `initial` (`U`): 누적값의 초기값이에요. 첫 번째 값으로 내보내져요.

#### 반환 값

(`IteratorObject<U, undefined>`): 초기값과 이어지는 각 누적값을 내보내는 지연 평가 이터레이터예요. 모든 네이티브 이터레이터 헬퍼(`map`, `take`, `toArray`, ...)를 갖추고 있어서 이어서 체이닝할 수 있어요.

### `pipe`와 함께 쓰는 `scan(callback, initial)`

[`pipe`](../../fp/reference/pipe.md)로 변환을 조합할 때는 `es-toolkit/fp/iterator`에서 커링된 형태를 가져오세요. 콜백과 초기값을 받고, 이터레이터를 받는 함수를 반환해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { scan, toArray } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3].values(),
  scan((acc, x) => acc + x, 0),
  toArray()
);
// 반환 값: [0, 1, 3, 6]
```
