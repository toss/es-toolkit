# sortedIndexBy

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

정렬된 배열에서 특정 값을 삽입할 수 있는 가장 낮은 인덱스를 찾아, 배열의 정렬 순서를 유지하도록 해요.
[sortedIndex](./sortedIndex.md)와 달리, 이 함수는 비교에 사용할 값을 추출하기 위해 커스텀 iteratee 함수를 지정할 수 있어요.

- iteratee 함수는 배열의 각 요소와 삽입할 값에 대해 호출돼요.
- 객체나 사용자 정의 데이터 타입을 포함한 배열에서 특정 속성이나 계산된 값에 따라 정렬 순서를 정하고 싶을 때 유용해요.

## 인터페이스

```typescript
function sortedIndexBy<T, R>(
  array: ArrayLike<T> | null | undefined,
  value: T,
  iteratee: (value: T) => R,
  retHighest?: boolean
): number;
```

### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 정렬된 배열. null 또는 undefined일 경우 빈 배열로 간주돼요.
- `value` (`T`): 삽입 위치를 찾기 위해 평가할 값.
- `iteratee` (`(item: T) => R`):
  배열의 요소와 삽입할 값을 변환하는 함수. 이 함수의 반환값을 기준으로 정렬 순서를 결정해요.
- `retHighest` (`boolean, 선택 사항`):
  동일한 값이 배열에 존재하는 경우, 마지막 위치를 반환하려면 true로 설정해요. (기본값: false)

### 반환 값

(`number`): 정렬 순서를 유지하기 위해 값을 삽입할 인덱스입니다.

## 예시

```typescript
import { sortedIndexBy } from 'es-toolkit/compat';

const objects = [{ x: 10 }, { x: 20 }, { x: 30 }];

// 비교를 위해 `x` 속성을 추출하는 iteratee 사용
sortedIndexBy(objects, { x: 25 }, o => o.x);
// 반환값: 2
// 설명: `x` 속성을 기준으로 `{ x: 25 }`는 인덱스 2를 반환해요.

// 사용자 정의 정렬 로직 처리
const strings = ['apple', 'banana', 'cherry'];
sortedIndexBy(strings, 'apricot', str => str.length);
// 반환값: 1
// 설명: 문자열의 길이를 기준으로 'apricot'은 인덱스 1을 반환해요.
```
