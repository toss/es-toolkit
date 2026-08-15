# every (`Map`)

Map의 모든 항목이 제공된 조건 함수를 만족하는지 테스트해요.

```typescript
const allMatch = every(map, doesMatch);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/map`에서만 사용할 수 있어요.

:::

## 사용법

### `every(map, doesMatch)`

Map의 모든 항목이 특정 조건을 만족하는지 확인하고 싶을 때 `every`를 사용하세요. 각 항목을 테스트하는 조건 함수를 제공하면, 모든 항목이 조건을 만족하면 true를, 그렇지 않으면 false를 반환해줘요.

```typescript
import { every } from 'es-toolkit/map';

const map = new Map([
  ['a', 10],
  ['b', 20],
  ['c', 30],
]);

const result = every(map, value => value > 5);
// 결과: true

const result2 = every(map, value => value > 15);
// 결과: false
```

다양한 조건을 테스트할 수 있어요.

```typescript
import { every } from 'es-toolkit/map';

// 모든 값이 기준을 만족하는지 확인해요.
const inventory = new Map([
  ['apple', { quantity: 10, inStock: true }],
  ['banana', { quantity: 5, inStock: true }],
  ['orange', { quantity: 8, inStock: true }],
]);

const allInStock = every(inventory, item => item.inStock);
// 결과: true

// 모든 키가 패턴과 일치하는지 확인해요.
const settings = new Map([
  ['api.timeout', 5000],
  ['api.retries', 3],
  ['api.host', 'localhost'],
]);

const allApiSettings = every(settings, (value, key) => key.startsWith('api.'));
// 결과: true
```

#### 파라미터

- `map` (`Map<K, V>`): 테스트할 Map이에요.
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): 각 항목을 테스트하는 조건 함수예요.

#### 반환 값

(`boolean`): 모든 항목이 조건을 만족하면 true를, 그렇지 않으면 false를 반환해요.
