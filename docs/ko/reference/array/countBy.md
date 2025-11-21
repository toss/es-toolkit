# countBy

배열의 요소들을 변환 함수의 결과값으로 분류하고, 개수를 센 객체를 반환해요.

```typescript
const counted = countBy(arr, mapper);
```

## 사용법

### `countBy(arr, mapper)`

배열의 요소들을 특정 기준으로 분류하고 각 그룹의 개수를 세고 싶을 때 `countBy`를 사용하세요. 변환 함수가 반환하는 값을 키로 사용해서 요소들을 그룹화하고, 각 그룹에 속한 요소의 개수를 계산해요.

```typescript
import { countBy } from 'es-toolkit/array';

// 숫자를 홀수/짝수로 분류해서 개수를 세요.
countBy([1, 2, 3, 4, 5], item => (item % 2 === 0 ? 'even' : 'odd'));
// Returns: { odd: 3, even: 2 }
```

객체 배열의 특정 속성을 기준으로 개수를 셀 수도 있어요.

```typescript
import { countBy } from 'es-toolkit/array';

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'David', age: 30 },
];

countBy(users, user => user.age);
// Returns: { '25': 2, '30': 2 }
```

#### 파라미터

- `arr` (`T[]`): 요소의 개수를 세고자 하는 배열이에요.
- `mapper` (`(item: T) => K`): 요소를 분류할 기준이 되는 값을 반환하는 함수예요.

#### 반환 값

(`Record<K, number>`): 각 분류 기준별로 요소가 몇 개 있는지를 나타내는 객체예요.
