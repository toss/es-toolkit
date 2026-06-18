# some (`Map`)

Map의 적어도 하나의 항목이 제공된 조건 함수를 만족하는지 테스트해요.

```typescript
const anyMatch = some(map, doesMatch);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/map`에서만 사용할 수 있어요.

:::

## 사용법

### `some(map, doesMatch)`

Map의 적어도 하나의 항목이 특정 조건을 만족하는지 확인하고 싶을 때 `some`을 사용하세요. 각 항목을 테스트하는 조건 함수를 제공하면, 적어도 하나의 항목이 조건을 만족하면 true를, 그렇지 않으면 false를 반환해줘요.

```typescript
import { some } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

const result = some(map, value => value > 2);
// 결과: true

const result2 = some(map, value => value > 5);
// 결과: false
```

다양한 조건을 테스트할 수 있어요.

```typescript
import { some } from 'es-toolkit/map';

// 어떤 값이라도 기준을 만족하는지 확인해요.
const inventory = new Map([
  ['apple', { quantity: 0, inStock: false }],
  ['banana', { quantity: 5, inStock: true }],
  ['orange', { quantity: 0, inStock: false }],
]);

const hasStock = some(inventory, item => item.inStock);
// 결과: true

// 어떤 키라도 패턴과 일치하는지 확인해요.
const data = new Map([
  ['user_1', 'Alice'],
  ['user_2', 'Bob'],
  ['group_1', 'Admins'],
]);

const hasAdmin = some(data, (value, key) => key.startsWith('admin_'));
// 결과: false
```

#### 파라미터

- `map` (`Map<K, V>`): 테스트할 Map이에요.
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): 각 항목을 테스트하는 조건 함수예요.

#### 반환 값

(`boolean`): 적어도 하나의 항목이 조건을 만족하면 true를, 그렇지 않으면 false를 반환해요.
