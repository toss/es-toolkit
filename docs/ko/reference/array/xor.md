# xor

두 배열의 대칭 차집합을 계산해요.

이 함수는 두 배열을 받아서, 두 배열 중 하나에만 있고 교집합에는 없는 요소들로 구성된 배열을 반환해요. 즉, 첫 번째 배열에만 있는 요소와 두 번째 배열에만 있는 요소들을 포함해요. 중복된 값들은 제거돼요.

## 인터페이스

```typescript
function xor<T>(arr1: readonly T[], arr2: readonly T[]): T[];
```

### 파라미터

- `arr1` (`readonly T[]`): 비교할 첫 번째 배열이에요.
- `arr2` (`readonly T[]`): 비교할 두 번째 배열이에요.

### 반환 값

(`T[]`): 두 배열의 대칭 차집합을 나타내는 새 배열이에요.

## 예시

```typescript
import { xor } from 'es-toolkit/array';

// 기본 사용법
const array1 = [1, 2, 3, 4];
const array2 = [3, 4, 5, 6];
const result = xor(array1, array2);
console.log(result);
// 출력: [1, 2, 5, 6]

// 문자열 배열에서 사용
const fruits1 = ['apple', 'banana', 'cherry'];
const fruits2 = ['banana', 'grape', 'apple'];
const result2 = xor(fruits1, fruits2);
console.log(result2);
// 출력: ['cherry', 'grape']

// 중복된 요소가 있는 경우
const nums1 = [1, 2, 2, 3];
const nums2 = [3, 4, 4, 5];
const result3 = xor(nums1, nums2);
console.log(result3);
// 출력: [1, 2, 4, 5]

// 완전히 다른 배열들
const setA = ['a', 'b'];
const setB = ['c', 'd'];
const result4 = xor(setA, setB);
console.log(result4);
// 출력: ['a', 'b', 'c', 'd']

// 동일한 배열들
const setC = [1, 2, 3];
const setD = [1, 2, 3];
const result5 = xor(setC, setD);
console.log(result5);
// 출력: []
```

## Lodash 호환성

`es-toolkit/compat`에서 `xor`을 가져오면 Lodash와 완전히 호환돼요.

```typescript
import { xor } from 'es-toolkit/compat';

const result = xor([1, 2, 3], [2, 3, 4]);
// 결과: [1, 4]
```
