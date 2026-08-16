# countBy (`Map`)

변환 함수를 기반으로 Map의 항목 발생 횟수를 세요.

```typescript
const counts = countBy(map, mapper);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/map`에서만 사용할 수 있어요.

:::

## 사용법

### `countBy(map, mapper)`

Map의 항목이 서로 다른 카테고리에 얼마나 속하는지 세고 싶을 때 `countBy`를 사용하세요. 각 값-키 쌍에서 키를 생성하는 함수를 제공하면, 생성된 키와 그 개수를 값으로 하는 Map을 반환해요. 변환이 동일한 키를 생성하는 각 항목에 대해 개수가 증가해요.

```typescript
import { countBy } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 1],
]);

const result = countBy(map, value => value);
// 결과: Map(2) { 1 => 2, 2 => 1 }
```

다양한 기준으로 항목을 셀 수 있어요.

```typescript
import { countBy } from 'es-toolkit/map';

// 값의 속성으로 세요.
const users = new Map([
  ['user1', { name: 'Alice', age: 25, department: 'Engineering' }],
  ['user2', { name: 'Bob', age: 30, department: 'Engineering' }],
  ['user3', { name: 'Charlie', age: 35, department: 'Sales' }],
]);

const byDepartment = countBy(users, user => user.department);
// 결과: Map(2) { 'Engineering' => 2, 'Sales' => 1 }

// 파생된 값으로 세요.
const ages = new Map([
  ['p1', 25],
  ['p2', 30],
  ['p3', 25],
  ['p4', 40],
]);

const ageGroups = countBy(ages, age => (age < 30 ? 'young' : 'senior'));
// 결과: Map(2) { 'young' => 2, 'senior' => 2 }

// 값과 키를 모두 사용해서 세요.
const items = new Map([
  ['alice', 20],
  ['bob', 30],
  ['carol', 20],
]);

const firstLetter = countBy(items, (value, key) => key[0]);
// 결과: Map(3) { 'a' => 1, 'b' => 1, 'c' => 1 }
```

#### 파라미터

- `map` (`Map<K, V>`): 발생 횟수를 셀 Map이에요.
- `mapper` (`(value: V, key: K, object: Map<K, V>) => K2`): 카운팅을 위한 키를 생성하는 함수예요.

#### 반환 값

(`Map<K2, number>`): 매핑된 키와 그 개수를 포함하는 Map을 반환해요.
