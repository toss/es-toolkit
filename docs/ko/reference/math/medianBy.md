# medianBy

`getValue` 함수를 각 요소에 적용하여 배열의 중앙값을 계산해요.

```typescript
const middle = medianBy(items, getValue);
```

## 레퍼런스

### `medianBy(items, getValue)`

배열의 각 요소에 함수를 적용한 결과의 중앙값을 구하고 싶을 때 `medianBy`를 사용하세요. 객체 배열에서 특정 속성의 중앙값을 계산하거나, 각 요소를 변환한 후 중앙값을 구할 때 유용해요. 홀수 개 요소를 가진 배열이면 정확히 가운데 값을, 짝수 개 요소를 가진 배열이면 가운데 두 값의 평균을 반환해요. 빈 배열이 주어지면 `NaN`을 반환해요.

```typescript
import { medianBy } from 'es-toolkit/math';

// 객체 배열에서 특정 속성의 중앙값을 계산해요 (홀수 개)
const people = [{ age: 23 }, { age: 25 }, { age: 27 }, { age: 29 }, { age: 31 }];
const medianAge = medianBy(people, person => person.age);
// medianAge는 27이 돼요 (정렬된 ages [23, 25, 27, 29, 31]에서 가운데 값)

// 객체 배열에서 특정 속성의 중앙값을 계산해요 (짝수 개)
const scores = [{ score: 80 }, { score: 90 }, { score: 85 }, { score: 95 }];
const medianScore = medianBy(scores, item => item.score);
// medianScore는 87.5가 돼요 (정렬된 scores [80, 85, 90, 95]에서 (85 + 90) / 2)

// 문자열 길이의 중앙값을 계산해요
const words = ['cat', 'elephant', 'dog', 'butterfly', 'ant'];
const medianLength = medianBy(words, word => word.length);
// medianLength는 3이 돼요 (lengths [3, 8, 3, 9, 3]을 정렬하면 [3, 3, 3, 8, 9]에서 가운데 값)

// 빈 배열의 경우 NaN을 반환해요
const emptyResult = medianBy([], x => x);
// emptyResult는 NaN이 돼요
```

#### 파라미터

- `items` (`readonly T[]`): 중앙값을 계산할 배열이에요.
- `getValue` (`(element: T) => number`): 각 요소에서 숫자 값을 선택하는 함수예요.

#### 반환 값

(`number`): `getValue` 함수를 기준으로, 배열에 있는 모든 값의 중앙값을 반환해요. 빈 배열이면 `NaN`을 반환해요.
