# intersectionBy

`mapper` 함수가 반환하는 값을 기준으로, 두 배열의 교집합을 반환해요.

이 함수는 파라미터로 두 개의 배열과 `mapper` 함수를 받아요.
`mapper` 함수로 각 배열의 요소들을 변환했을 때, 두 배열에 모두 포함되는 요소들로 이루어진 새로운 배열을 반환해요.
실제 구현을 살펴보면, 첫 번째 배열과 두 번째 배열을 `mapper` 가 반환하는 값을 기준으로 비교하여, 첫 번째 배열의 요소들 중 두 번째 배열에 없는 요소들을 제거해요.

## 인터페이스

```typescript
function intersectionBy<T, U>(firstArr: T[], secondArr: T[], mapper: (item: T) => U): T[];
```

### 파라미터

- `firstArr` (`T[]`): 비교할 첫 번째 배열.
- `secondArr` (`T[]`): 비교할 두 번째 배열.
- `mapper` (`(item: T) => U`): 비교하기 위해 요소를 새로운 값으로 변환할 함수.

### 반환 값

(`T[]`): 첫 번째 배열과 두 번째 배열을 `mapper` 가 반환하는 값을 기준으로 비교하여, 두 배열 모두에 포함되는 요소들만 포함하는 새로운 배열.

## 예시

```typescript
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const mapper = item => item.id;
const result = intersectionBy(array1, array2, mapper);
// `mapper`로 변환했을 때 두 배열 모두에 포함되는 요소로 이루어진 [{ id: 2 }] 값이 반환되어요.
```

## Lodash와의 호환성

`es-toolkit/compat`에서 `intersectionBy`를 가져오면 lodash와 호환돼요.

- `intersectionBy`는 공통 요소를 찾기 위해 여러 개의 유사 배열 객체를 받을 수 있어요.
- `intersectionBy`는 속성 키를 iteratee로 받을 수 있어요.

```typescript
import { intersectionBy } from 'es-toolkit/compat';

const array1 = [1.2, 2.4, 3.6];
const array2 = [2.5, 3.7];
const array3 = [2.6, 3.8];
const result = intersectionBy(array1, array2, array3, Math.floor);
// 결과는 [2.4, 3.6]이에요. Math.floor를 적용한 후 공통 요소는 2와 3이에요.

const array1 = [{ x: 1 }, { x: 2 }, { x: 3 }];
const array2 = [{ x: 2 }, { x: 3 }, { x: 4 }];
const result = intersectionBy(array1, array2, 'x');
// 결과는 [{ x: 2 }, { x: 3 }]이에요. 이 요소들은 동일한 `x` 속성을 가지고 있어요.

const arrayLike1 = { 0: 'apple', 1: 'banana', 2: 'cherry', length: 3 };
const arrayLike2 = { 0: 'banana', 1: 'cherry', 2: 'date', length: 3 };
const result = intersectionBy(arrayLike1, arrayLike2);
// 결과는 ['banana', 'cherry']예요. 이 요소들은 두 유사 배열 객체에서 공통으로 존재해요.
```
