# keyBy (`Map`)

제공된 키 생성 함수를 기반으로 Map의 각 항목을 매핑해요.

```typescript
const result = keyBy(map, getKeyFromEntry);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/map`에서만 사용할 수 있어요.

:::

## 사용법

### `keyBy(map, getKeyFromEntry)`

값에서 새로운 키를 생성하여 Map을 재구성하고 싶을 때 `keyBy`를 사용하세요. 각 값-키 쌍에서 키를 생성하는 함수를 제공하면, 키 함수에 의해 생성된 키와 원래 맵의 해당 값으로 구성된 새 Map을 반환해요. 여러 항목이 동일한 키를 생성하면 마지막으로 발견된 값이 사용돼요.

```typescript
import { keyBy } from 'es-toolkit/map';

const map = new Map([
  ['x', { type: 'fruit', name: 'apple' }],
  ['y', { type: 'fruit', name: 'banana' }],
  ['z', { type: 'vegetable', name: 'carrot' }],
]);

const result = keyBy(map, item => item.type);
// 결과:
// Map(2) {
//   'fruit' => { type: 'fruit', name: 'banana' },
//   'vegetable' => { type: 'vegetable', name: 'carrot' }
// }
// 참고: 'banana'가 마지막 'fruit'였기 때문에 유지돼요
```

다양한 기준으로 데이터를 재구성할 수 있어요.

```typescript
import { keyBy } from 'es-toolkit/map';

// ID 속성으로 인덱싱해요.
const users = new Map([
  ['user1', { id: 101, name: 'Alice', role: 'admin' }],
  ['user2', { id: 102, name: 'Bob', role: 'user' }],
  ['user3', { id: 103, name: 'Charlie', role: 'user' }],
]);

const byId = keyBy(users, user => user.id);
// 결과: 키가 101, 102, 103인 Map

// 역할별로 인덱싱해요 (역할당 마지막 사용자가 선택돼요)
const byRole = keyBy(users, user => user.role);
// 결과: Map(2) {
//   'admin' => { id: 101, name: 'Alice', role: 'admin' },
//   'user' => { id: 103, name: 'Charlie', role: 'user' }
// }

// 값과 원래 키를 모두 사용하여 키를 변환해요.
const inventory = new Map([
  ['item_1', { category: 'electronics', price: 100 }],
  ['item_2', { category: 'electronics', price: 200 }],
]);

const categorized = keyBy(inventory, (value, key) => `${value.category}_${key}`);
// 결과: 키가 'electronics_item_1', 'electronics_item_2'인 Map
```

#### 파라미터

- `map` (`Map<K, V>`): 매핑할 항목의 맵이에요.
- `getKeyFromEntry` (`(value: V, key: K, object: Map<K, V>) => K2`): 값-키 쌍에서 키를 생성하는 함수예요.

#### 반환 값

(`Map<K2, V>`): 생성된 키가 각 항목의 값에 매핑된 Map을 반환해요.
