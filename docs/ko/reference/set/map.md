# map (`Set`)

제공된 함수로 요소를 변환한 새로운 Set을 생성해요.

```typescript
const transformed = map(set, getNewValue);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/set`에서만 사용할 수 있어요.

:::

## 사용법

### `map(set, getNewValue)`

Set의 요소를 변환하고 싶을 때 `map`을 사용하세요. 각 요소에서 새로운 값을 생성하는 함수를 제공하면, 변환된 요소로 구성된 새 Set을 반환해줘요.

```typescript
import { map } from 'es-toolkit/set';

const set = new Set([1, 2, 3]);

const result = map(set, value => value * 2);
// 결과: Set(3) { 2, 4, 6 }
```

다양한 방법으로 요소를 변환할 수 있어요.

```typescript
import { map } from 'es-toolkit/set';

// 문자열 변환해요.
const names = new Set(['alice', 'bob', 'charlie']);

const uppercased = map(names, name => name.toUpperCase());
// 결과: Set(3) { 'ALICE', 'BOB', 'CHARLIE' }

// 객체로 변환해요.
const prices = new Set([10, 20, 30]);

const products = map(prices, price => ({ price, currency: 'USD' }));
// 결과: { price: 10, currency: 'USD' } 등의 객체를 가진 Set

// 속성 추출해요.
const users = new Set([
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]);

const ids = map(users, user => user.id);
// 결과: Set(2) { 1, 2 }
```

#### 파라미터

- `set` (`Set<T>`): 변환할 Set이에요.
- `getNewValue` (`(value: T, value2: T, set: Set<T>) => U`): 요소에서 새로운 값을 생성하는 함수예요.

#### 반환 값

(`Set<U>`): 변환된 요소를 가진 새로운 Set을 반환해요.
