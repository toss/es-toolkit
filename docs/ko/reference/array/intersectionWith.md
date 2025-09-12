# intersectionWith

사용자 정의 비교 함수를 기준으로 두 배열의 교집합을 구한 새 배열을 반환해요.

```typescript
const result = intersectionWith(firstArr, secondArr, areItemsEqual);
```

## 레퍼런스

### `intersectionWith(firstArr, secondArr, areItemsEqual)`

두 배열에서 사용자가 정의한 비교 함수로 공통 요소를 찾고 싶을 때 `intersectionWith`를 사용하세요. 단순한 값 비교로는 처리하기 어려운 복잡한 객체나 특수한 비교 로직이 필요한 경우에 유용해요.

```typescript
import { intersectionWith } from 'es-toolkit/array';

// 객체의 id 속성으로 비교해요.
const users1 = [{ id: 1, name: 'john' }, { id: 2, name: 'jane' }];
const users2 = [{ id: 2, name: 'jane' }, { id: 3, name: 'bob' }];
intersectionWith(users1, users2, (a, b) => a.id === b.id);
// Returns: [{ id: 2, name: 'jane' }]

// 다른 타입끼리도 비교할 수 있어요.
const objects = [{ id: 1, name: 'apple' }, { id: 2, name: 'banana' }];
const ids = [2, 3];
intersectionWith(objects, ids, (obj, id) => obj.id === id);
// Returns: [{ id: 2, name: 'banana' }]
```

복잡한 비교 로직도 구현할 수 있어요.

```typescript
import { intersectionWith } from 'es-toolkit/array';

// 대소문자를 구분하지 않는 문자열 비교
const words1 = ['Apple', 'Banana'];
const words2 = ['apple', 'cherry'];
intersectionWith(words1, words2, (a, b) => a.toLowerCase() === b.toLowerCase());
// Returns: ['Apple']

// 범위 내 숫자 비교
const numbers1 = [1.1, 2.3, 3.7];
const numbers2 = [1.0, 2.5, 4.0];
intersectionWith(numbers1, numbers2, (a, b) => Math.abs(a - b) < 0.5);
// Returns: [1.1] (1.1과 1.0의 차이가 0.5보다 작음)
```

#### 파라미터

- `firstArr` (`readonly T[]`): 비교할 첫 번째 배열이에요.
- `secondArr` (`readonly U[]`): 비교할 두 번째 배열이에요.
- `areItemsEqual` (`(x: T, y: U) => boolean`): 두 요소가 같은지 판단하는 함수예요. 같으면 `true`, 다르면 `false`를 반환해야 해요.

#### 반환 값

(`T[]`): 사용자 정의 비교 함수를 기준으로 두 배열에 공통으로 포함된 요소들로 이루어진 새 배열을 반환해요. 결과는 첫 번째 배열의 요소들로 구성돼요.