# meanBy

`getValue` 함수를 각 요소에 적용하여 배열의 평균을 계산해요.

```typescript
const average = meanBy(items, getValue);
```

## 레퍼런스

### `meanBy(items, getValue)`

배열의 각 요소에 함수를 적용한 결과의 평균을 구하고 싶을 때 `meanBy`를 사용하세요. 객체 배열에서 특정 속성의 평균을 계산하거나, 각 요소를 변환한 후 평균을 구할 때 유용해요. 빈 배열이 주어지면 `NaN`을 반환해요.

```typescript
import { meanBy } from 'es-toolkit/math';

// 객체 배열에서 특정 속성의 평균을 계산해요
const people = [{ age: 23 }, { age: 25 }, { age: 27 }];
const averageAge = meanBy(people, person => person.age);
// averageAge는 25가 돼요 ((23 + 25 + 27) / 3 = 75 / 3 = 25)

// 문자열 길이의 평균을 계산해요
const words = ['apple', 'banana', 'cherry'];
const averageLength = meanBy(words, word => word.length);
// averageLength는 5.33...이 돼요 ((5 + 6 + 6) / 3 ≈ 5.67)

// 빈 배열의 경우 NaN을 반환해요
const emptyResult = meanBy([], x => x);
// emptyResult는 NaN이 돼요
```

#### 파라미터

- `items` (`readonly T[]`): 평균을 계산할 배열이에요.
- `getValue` (`(element: T) => number`): 각 요소에서 숫자 값을 선택하는 함수예요.

#### 반환 값

(`number`): `getValue` 함수를 기준으로, 배열에 있는 모든 값의 평균을 반환해요. 빈 배열이면 `NaN`을 반환해요.
