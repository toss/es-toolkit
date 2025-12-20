# filter (`Map`)

조건 함수에 따라 Map을 필터링해요.

```typescript
const filtered = filter(map, callback);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/map`에서만 사용할 수 있어요.

:::

## 사용법

### `filter(map, callback)`

특정 조건을 만족하는 항목만 포함하는 새로운 Map을 만들고 싶을 때 `filter`를 사용하세요. 각 항목을 테스트하는 조건 함수를 제공하면, 조건이 true를 반환하는 항목만으로 구성된 새 Map을 반환해줘요.

```typescript
import { filter } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
  ['d', 4],
]);

const result = filter(map, value => value > 2);
// 결과:
// Map(2) {
//   'c' => 3,
//   'd' => 4
// }
```

다양한 기준으로 필터링할 수 있어요.

```typescript
import { filter } from 'es-toolkit/map';

// 값 타입으로 필터링해요.
const inventory = new Map([
  ['apple', { quantity: 10, inStock: true }],
  ['banana', { quantity: 0, inStock: false }],
  ['orange', { quantity: 5, inStock: true }],
]);

const inStockItems = filter(inventory, item => item.inStock);
// 결과: 'apple'과 'orange' 항목이 있는 Map

// 키 패턴으로 필터링해요.
const data = new Map([
  ['user_1', 'Alice'],
  ['admin_1', 'Bob'],
  ['user_2', 'Charlie'],
]);

const users = filter(data, (value, key) => key.startsWith('user_'));
// 결과: 'user_1'과 'user_2' 항목이 있는 Map
```

#### 파라미터

- `map` (`Map<K, V>`): 필터링할 Map이에요.
- `callback` (`(value: V, key: K, map: Map<K, V>) => boolean`): 각 항목을 테스트하는 조건 함수예요.

#### 반환 값

(`Map<K, V>`): 조건을 만족하는 항목만 포함하는 새로운 Map을 반환해요.
