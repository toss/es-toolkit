# countBy (`Set`)

변환 함수를 기반으로 Set의 항목 발생 횟수를 세요.

```typescript
const counts = countBy(set, mapper);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/set`에서만 사용할 수 있어요.

:::

## 사용법

### `countBy(set, mapper)`

Set의 요소가 서로 다른 카테고리에 얼마나 속하는지 세고 싶을 때 `countBy`를 사용하세요. 각 값에서 키를 생성하는 함수를 제공하면, 생성된 키와 그 개수를 값으로 하는 Map을 반환해요. 변환이 동일한 키를 생성하는 각 요소에 대해 개수가 증가해요.

```typescript
import { countBy } from 'es-toolkit/set';

const set = new Set([1, 2, 3, 4, 5]);

const result = countBy(set, value => (value % 2 === 0 ? 'even' : 'odd'));
// 결과: Map(2) { 'odd' => 3, 'even' => 2 }
```

다양한 기준으로 요소를 셀 수 있어요.

```typescript
import { countBy } from 'es-toolkit/set';

// 문자열 길이로 세요.
const words = new Set(['apple', 'banana', 'cherry', 'date']);

const byLength = countBy(words, word => word.length);
// 결과: Map(3) { 5 => 1, 6 => 2, 4 => 1 }

// 속성으로 세요.
const users = new Set([
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'user' },
  { name: 'Diana', role: 'admin' },
]);

const byRole = countBy(users, user => user.role);
// 결과: Map(2) { 'admin' => 2, 'user' => 2 }

// 파생된 카테고리로 세요.
const ages = new Set([15, 25, 35, 45, 55]);

const ageGroups = countBy(ages, age => {
  if (age < 18) return 'minor';
  if (age < 65) return 'adult';
  return 'senior';
});
// 결과: Map(2) { 'minor' => 1, 'adult' => 4 }
```

#### 파라미터

- `set` (`Set<T>`): 발생 횟수를 셀 Set이에요.
- `mapper` (`(value: T, value2: T, set: Set<T>) => K`): 카운팅을 위한 키를 생성하는 함수예요.

#### 반환 값

(`Map<K, number>`): 매핑된 키와 그 개수를 포함하는 Map을 반환해요.
