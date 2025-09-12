# xorBy

사용자 정의 매핑 함수를 사용하여 두 배열의 대칭 차집합을 계산해요.

이 함수는 두 배열과 매핑 함수를 받아서, 매핑 함수의 결과 값을 기준으로 두 배열 중 하나에만 있는 요소들로 구성된 배열을 반환해요. 먼저 각 배열의 요소들을 매핑 함수를 통해 변환한 후, 대칭 차집합을 계산해요.

## 인터페이스

```typescript
function xorBy<T, U>(arr1: readonly T[], arr2: readonly T[], mapper: (item: T) => U): T[];
```

### 파라미터

- `arr1` (`readonly T[]`): 비교할 첫 번째 배열이에요.
- `arr2` (`readonly T[]`): 비교할 두 번째 배열이에요.
- `mapper` (`(item: T) => U`): 각 요소를 비교 가능한 값으로 변환하는 함수예요.

### 반환 값

(`T[]`): 매핑 함수의 결과를 기준으로 계산된 대칭 차집합을 나타내는 새 배열이에요.

## 예시

```typescript
import { xorBy } from 'es-toolkit/array';

// id 속성을 기준으로 객체 배열 비교
const users1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const users2 = [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }];
const result = xorBy(users1, users2, user => user.id);
console.log(result);
// 출력: [{ id: 1, name: 'Alice' }, { id: 3, name: 'Charlie' }]

// 문자열 길이를 기준으로 비교
const words1 = ['apple', 'banana', 'cherry'];
const words2 = ['grape', 'orange', 'apple'];
const result2 = xorBy(words1, words2, word => word.length);
console.log(result2);
// 출력: ['cherry', 'grape'] (길이 6과 5를 가진 요소들)

// 수학적 함수를 사용한 비교
const numbers1 = [1, 2, 3, 4];
const numbers2 = [3, 4, 5, 6];
const result3 = xorBy(numbers1, numbers2, n => n % 3);
console.log(result3);
// 출력: [2, 5] (3으로 나눈 나머지가 1, 2인 요소들)

// 속성 경로를 사용한 복잡한 객체 비교
const products1 = [
  { category: { id: 1 }, name: 'Laptop' },
  { category: { id: 2 }, name: 'Phone' }
];
const products2 = [
  { category: { id: 2 }, name: 'Tablet' },
  { category: { id: 3 }, name: 'Watch' }
];
const result4 = xorBy(products1, products2, product => product.category.id);
console.log(result4);
// 출력: [{ category: { id: 1 }, name: 'Laptop' }, { category: { id: 3 }, name: 'Watch' }]
```

## Lodash 호환성

`es-toolkit/compat`에서 `xorBy`를 가져오면 Lodash와 완전히 호환돼요.

```typescript
import { xorBy } from 'es-toolkit/compat';

const result = xorBy([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], 'id');
// 결과: [{ id: 1 }, { id: 3 }]
```
