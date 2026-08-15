# mapValues (`Map`)

제공된 함수로 값을 변환하되 키는 동일하게 유지하는 새로운 Map을 생성해요.

```typescript
const transformed = mapValues(map, getNewValue);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/map`에서만 사용할 수 있어요.

:::

## 사용법

### `mapValues(map, getNewValue)`

Map의 값을 변환하면서 키는 그대로 유지하고 싶을 때 `mapValues`를 사용하세요. 각 항목에서 새로운 값을 생성하는 함수를 제공하면, 변환된 값을 가진 새 Map을 반환해줘요.

```typescript
import { mapValues } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = mapValues(map, value => value * 2);
// 결과:
// Map(3) {
//   'a' => 2,
//   'b' => 4,
//   'c' => 6
// }
```

다양한 방법으로 값을 변환할 수 있어요.

```typescript
import { mapValues } from 'es-toolkit/map';

// 값 포맷팅해요.
const prices = new Map([
  ['apple', 1.5],
  ['banana', 0.75],
  ['orange', 2.0],
]);

const formatted = mapValues(prices, value => `$${value.toFixed(2)}`);
// 결과: '$1.50', '$0.75', '$2.00' 값을 가진 Map

// 키에 따라 변환해요.
const inventory = new Map([
  ['premium_item', 10],
  ['standard_item', 20],
  ['basic_item', 30],
]);

const adjusted = mapValues(inventory, (value, key) => (key.startsWith('premium_') ? value * 1.5 : value));
// 결과: 15, 20, 30 값을 가진 Map
```

#### 파라미터

- `map` (`Map<K, V>`): 변환할 Map이에요.
- `getNewValue` (`(value: V, key: K, object: Map<K, V>) => V`): 값-키 쌍에서 새로운 값을 생성하는 함수예요.

#### 반환 값

(`Map<K, V>`): 동일한 키와 변환된 값을 가진 새로운 Map을 반환해요.
