# findKey (`Map`)

조건 함수가 true를 반환하는 Map의 첫 번째 키를 찾아요.

```typescript
const key = findKey(map, doesMatch);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/map`에서만 사용할 수 있어요.

:::

## 사용법

### `findKey(map, doesMatch)`

특정 조건과 일치하는 첫 번째 항목의 키를 찾고 싶을 때 `findKey`를 사용하세요. 각 항목을 테스트하는 조건 함수를 제공하면, 처음으로 일치하는 항목의 키를 반환하거나 찾지 못하면 undefined를 반환해줘요.

```typescript
import { findKey } from 'es-toolkit/map';

const map = new Map([
  ['apple', { color: 'red', quantity: 10 }],
  ['banana', { color: 'yellow', quantity: 5 }],
  ['grape', { color: 'purple', quantity: 15 }],
]);

const result = findKey(map, value => value.quantity > 10);
// 결과: 'grape'
```

다양한 기준으로 검색할 수 있어요.

```typescript
import { findKey } from 'es-toolkit/map';

// 값의 속성으로 찾아요.
const users = new Map([
  ['user1', { name: 'Alice', age: 25 }],
  ['user2', { name: 'Bob', age: 30 }],
  ['user3', { name: 'Charlie', age: 35 }],
]);

const seniorUser = findKey(users, user => user.age >= 35);
// 결과: 'user3'

// 키 패턴으로 찾아요.
const settings = new Map([
  ['api.timeout', 5000],
  ['api.retries', 3],
  ['db.host', 'localhost'],
]);

const dbSetting = findKey(settings, (value, key) => key.startsWith('db.'));
// 결과: 'db.host'
```

#### 파라미터

- `map` (`Map<K, V>`): 검색할 Map이에요.
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): 각 항목을 테스트하는 조건 함수예요.

#### 반환 값

(`K | undefined`): 조건을 만족하는 첫 번째 항목의 키를 반환하거나, 찾지 못하면 undefined를 반환해요.
