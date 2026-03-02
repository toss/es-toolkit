# mapKeys (`Map`)

제공된 함수로 키를 변환하되 값은 동일하게 유지하는 새로운 Map을 생성해요.

```typescript
const transformed = mapKeys(map, getNewKey);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/map`에서만 사용할 수 있어요.

:::

## 사용법

### `mapKeys(map, getNewKey)`

Map의 키를 변환하면서 값은 그대로 유지하고 싶을 때 `mapKeys`를 사용하세요. 각 항목에서 새로운 키를 생성하는 함수를 제공하면, 변환된 키를 가진 새 Map을 반환해줘요.

```typescript
import { mapKeys } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = mapKeys(map, (value, key) => key.toUpperCase());
// 결과:
// Map(3) {
//   'A' => 1,
//   'B' => 2,
//   'C' => 3
// }
```

다양한 방법으로 키를 변환할 수 있어요.

```typescript
import { mapKeys } from 'es-toolkit/map';

// 키에 접두사 추가해요.
const categories = new Map([
  ['fruit', ['apple', 'banana']],
  ['vegetable', ['carrot', 'potato']],
]);

const prefixed = mapKeys(categories, (value, key) => `category_${key}`);
// 결과: 'category_fruit', 'category_vegetable' 키를 가진 Map

// 값에 따라 변환해요.
const scores = new Map([
  ['alice', 95],
  ['bob', 87],
  ['charlie', 92],
]);

const ranked = mapKeys(scores, (value, key) => (value >= 90 ? `top_${key}` : key));
// 결과: 'top_alice', 'bob', 'top_charlie' 키를 가진 Map
```

#### 파라미터

- `map` (`Map<K, V>`): 변환할 Map이에요.
- `getNewKey` (`(value: V, key: K, object: Map<K, V>) => K`): 값-키 쌍에서 새로운 키를 생성하는 함수예요.

#### 반환 값

(`Map<K, V>`): 변환된 키와 동일한 값을 가진 새로운 Map을 반환해요.
