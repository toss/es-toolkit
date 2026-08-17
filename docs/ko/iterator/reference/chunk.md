# chunk (`Iterator`용)

이터레이터의 요소들을 주어진 길이의 배열로 지연 평가 방식으로 묶어요.

```typescript
const chunks = chunk(source, size);
```

## 사용법

### `chunk(source, size)`

요소 스트림을 고정된 크기의 묶음으로 처리하고 싶을 때 `chunk`를 사용하세요. 예를 들어 레코드를 데이터베이스에 한 번에 100개씩 저장할 때요. 각 묶음은 요청될 때만 만들어지기 때문에, 네이티브 `take`처럼 일찍 멈추는 헬퍼로 범위를 제한하면 무한 이터레이터에도 사용할 수 있어요. 소스 길이가 `size`의 정확한 배수가 아니면 마지막 묶음은 남은 요소들을 담기 때문에 더 짧을 수 있어요.

```typescript
import { chunk } from 'es-toolkit/iterator';

// 요소를 둘씩 묶어요. 남은 요소는 더 짧은 마지막 묶음이 돼요.
chunk([1, 2, 3, 4, 5].values(), 2).toArray();
// 반환 값: [[1, 2], [3, 4], [5]]

// 무한 소스를 take로 제한해서 묶음 단위로 처리해요.
chunk(sensorReadings(), 100).take(2).toArray();
// 반환 값: 100개씩 묶인 처음 두 묶음
```

#### 파라미터

- `source` (`Iterator<T>`): 묶음으로 나눌 이터레이터예요.
- `size` (`number`): 각 묶음의 길이예요. 0보다 큰 정수여야 해요.

#### 반환 값

(`IteratorObject<T[], undefined>`): 최대 `size`개 요소를 가진 배열들을 내보내는 지연 평가 이터레이터예요. 모든 네이티브 이터레이터 헬퍼(`map`, `take`, `toArray`, ...)를 갖추고 있어서 이어서 체이닝할 수 있어요.

#### 에러

`size`가 0보다 큰 정수가 아니면 에러를 던져요.

### `pipe`와 함께 쓰는 `chunk(size)`

[`pipe`](../../fp/reference/pipe.md)로 변환을 조합할 때는 `es-toolkit/fp/iterator`에서 커링된 형태를 가져오세요. `size`만 받고, 이터레이터를 받는 함수를 반환해요.

```typescript
import { pipe } from 'es-toolkit/fp';
import { chunk, toArray } from 'es-toolkit/fp/iterator';

pipe([1, 2, 3, 4, 5].values(), chunk(2), toArray());
// 반환 값: [[1, 2], [3, 4], [5]]
```
