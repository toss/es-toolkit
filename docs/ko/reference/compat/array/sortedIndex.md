# sortedIndex

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

정렬된 배열에서 특정 값을 삽입할 수 있는 가장 낮은 인덱스를 찾아, 배열의 정렬 순서를 유지하도록 해요.

- 배열이 정렬되어 있을 때, 새로운 값을 적절한 위치에 삽입해 정렬 순서를 유지해요.
- 이 함수는 이진 검색 알고리즘을 사용하므로, 대규모 배열에서도 효율적으로 동작해요.
- 더 복잡하거나 사용자 정의된 정렬 논리가 필요한 경우, [sortedIndexBy](./sortedIndexBy.md)를 사용하여 비교 로직을 커스터마이즈할 수 있어요.

이 함수는 값을 삽입해야 하는 인덱스를 반환해요.
값이 이미 배열에 존재하는 경우, 반환되는 인덱스는 해당 값의 첫 번째 위치 앞이에요.

## 인터페이스

```typescript
function sortedIndex<T>(array: ArrayLike<T> | null | undefined, value: T): number;
```

### 파라미터

- `array` (`ArrayLike<T> | null | undefined`):
  정렬된 배열. null 또는 undefined일 경우 빈 배열로 간주돼요.
- `value` (`T`):
  삽입 위치를 찾기 위해 평가할 값.

### 반환 값

(`number`): 배열의 정렬 순서를 유지하기 위해 값이 삽입되어야 할 인덱스.

## 예시

```typescript
import { sortedIndex } from 'es-toolkit/compat';

// 숫자 배열에서 기본 사용법
sortedIndex([10, 20, 30, 50], 40);
// 반환값: 3
// 설명: 40은 정렬 순서를 유지하기 위해 3을 반환해요.

// 빈 배열이나 null 배열 처리
sortedIndex(null, 25);
// 반환값: 0
// 설명: null 또는 undefined 배열은 빈 배열로 간주되며, 0을 반환해요.

// 기본 비교 로직을 사용하는 경우 (sortedIndexBy와의 위임 동작)
sortedIndex([10, '20', 30], 25);
// 반환값: 2
// 설명: 기본 비교 로직을 사용하며, 2를 반환해요.
```
