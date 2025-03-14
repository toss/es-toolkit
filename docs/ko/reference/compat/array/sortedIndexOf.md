# sortedIndexOf

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

정렬된 배열에서 두 번째 인자값이 처음으로 등장하는 위치를 찾아주는 함수예요. 즉, 찾으려는 값이 정렬된 배열 속 몇 번째에 위치해있는지 알려주는 함수예요. [sortedIndex](./sortedIndex.md)함수를 이용해서 비교 후에 인덱스를 반환해요.

## 인터페이스

```typescript
export function sortedIndexOf<T>(array: ArrayLike<T> | null | undefined, value: T): number;
```

### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 정렬된 배열이예요. 배열이 null 또는 undefined일 경우 -1을 리턴해요.
- `value` (`T`): 정렬된 배열속 비교를 통해 찾으려는 값.

### 반환 값

(`number`): 정렬 순서를 유지하기 위해 값을 삽입할 인덱스입니다.

## 예시

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

const numbers = [11, 22, 33, 44, 55];
const unSortedArray = [55, 33, 22, 11, 44];
const duplicateArray = [1, 2, 2, 3, 3, 3, 4];
const emptyArray = [];
const zeroMinusArray = [-0];
const zeroPlusArray = [0];
const floatingArray = [1.1, 2.2, 3.3];
const arrayLike = { length: 3, 0: 10, 1: 20, 2: 30 };

// 일반적인 경우
sortedIndexOf(numbers, 11);
// 반환값: 0
// 설명: numbers 배열에서 값 11의 위치는 0입니다.

// 중복된 값
sortedIndexOf(duplicateArray, 3);
// 반환값: 3
// 설명: 값 3의 첫 번째 발생 인덱스는 3입니다.

// 존재하지 않는 값
sortedIndexOf(numbers, 30);
// 반환값: -1
// 설명: 30은 배열에 존재하지 않으므로 -1을 반환합니다.

// 추가 인자 값
sortedIndexOf(numbers, 22, true);
// 반환값: 1
// 설명: 추가 인자를 넣으면 무시됩니다.

// 부동 소수점 값
sortedIndexOf(floatingArray, 2.2);
// 반환값: 1
// 설명: 배열에서 값 2.2의 위치는 1입니다.

// 빈 배열
sortedIndexOf(emptyArray, 30);
// 반환값: -1
// 설명: 빈 배열에서 값을 검색하면 -1을 반환합니다.

// undefined와 빈 배열
sortedIndexOf(emptyArray, undefined);
// 반환값: -1
// 설명: 빈 배열에서 값을 검색할 때는 undefined여도 항상 -1을 반환합니다.

// 정렬되지 않은 배열
sortedIndexOf(unSortedArray, 11);
// 반환값: -1
// 설명: 정렬되지 않은 배열을 사용하면 -1을 반환합니다.

// -0과 0은 동일하게 취급됨
sortedIndexOf(zeroMinusArray, 0);
// 반환값: 0
// 설명: JavaScript에서 -0과 0은 동일하게 취급됩니다.

// -0과 0은 동일하게 취급됨
sortedIndexOf(zeroPlusArray, -0);
// 반환값: 0
// 설명: JavaScript에서 -0과 0은 동일하게 취급됩니다.

// 유사 배열 객체
sortedIndexOf(arrayLike, 20);
// 반환값: 1
// 설명: 유사 배열 객체에서도 작동합니다.
```
