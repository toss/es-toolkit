# keyBy (`Set`)

제공된 키 생성 함수를 기반으로 Set의 각 요소를 매핑해요.

```typescript
const result = keyBy(set, getKeyFromValue);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/set`에서만 사용할 수 있어요.

:::

## 사용법

### `keyBy(set, getKeyFromValue)`

값에서 키를 생성하여 Set을 Map으로 변환하고 싶을 때 `keyBy`를 사용하세요. 각 값에서 키를 생성하는 함수를 제공하면, 키 함수에 의해 생성된 키와 원래 set의 해당 값으로 구성된 새 Map을 반환해요. 여러 요소가 동일한 키를 생성하면 마지막으로 발견된 값이 사용돼요.

```typescript
import { keyBy } from 'es-toolkit/set';

const set = new Set([
  { type: 'fruit', name: 'apple' },
  { type: 'fruit', name: 'banana' },
  { type: 'vegetable', name: 'carrot' },
]);

const result = keyBy(set, item => item.type);
// 결과:
// Map(2) {
//   'fruit' => { type: 'fruit', name: 'banana' },
//   'vegetable' => { type: 'vegetable', name: 'carrot' }
// }
// 참고: 'banana'가 마지막 'fruit'였기 때문에 유지돼요
```

다양한 기준으로 인덱스를 만들 수 있어요.

```typescript
import { keyBy } from 'es-toolkit/set';

// ID로 인덱싱해요.
const users = new Set([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
]);

const byId = keyBy(users, user => user.id);
// 결과: Map(3) { 1 => {...}, 2 => {...}, 3 => {...} }

// 이름으로 인덱싱해요.
const byName = keyBy(users, user => user.name);
// 결과: 키가 'Alice', 'Bob', 'Charlie'인 Map

// 파생된 값으로 인덱싱해요.
const numbers = new Set([1, 2, 3, 4, 5]);

const byParity = keyBy(numbers, num => (num % 2 === 0 ? 'even' : 'odd'));
// 결과: Map(2) {
//   'odd' => 5,
//   'even' => 4
// }
// 참고: 마지막 짝수(4)와 마지막 홀수(5) 값이 유지돼요
```

#### 파라미터

- `set` (`Set<T>`): 매핑할 요소의 Set이에요.
- `getKeyFromValue` (`(value: T, value2: T, set: Set<T>) => K`): 값에서 키를 생성하는 함수예요.

#### 반환 값

(`Map<K, T>`): 생성된 키가 각 요소의 값에 매핑된 Map을 반환해요.
