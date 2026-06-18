# findValue (`Map`)

조건 함수가 true를 반환하는 Map의 첫 번째 값을 찾아요.

```typescript
const value = findValue(map, doesMatch);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/map`에서만 사용할 수 있어요.

:::

## 사용법

### `findValue(map, doesMatch)`

특정 조건과 일치하는 첫 번째 항목의 값을 찾고 싶을 때 `findValue`를 사용하세요. 각 항목을 테스트하는 조건 함수를 제공하면, 처음으로 일치하는 항목의 값을 반환하거나 찾지 못하면 undefined를 반환해줘요.

```typescript
import { findValue } from 'es-toolkit/map';

const map = new Map([
  ['apple', { color: 'red', quantity: 10 }],
  ['banana', { color: 'yellow', quantity: 5 }],
  ['grape', { color: 'purple', quantity: 15 }],
]);

const result = findValue(map, value => value.quantity > 10);
// 결과: { color: 'purple', quantity: 15 }
```

다양한 기준으로 검색할 수 있어요.

```typescript
import { findValue } from 'es-toolkit/map';

// 값의 속성으로 찾아요.
const products = new Map([
  ['p1', { name: 'Laptop', price: 1000, inStock: true }],
  ['p2', { name: 'Mouse', price: 25, inStock: false }],
  ['p3', { name: 'Keyboard', price: 75, inStock: true }],
]);

const expensiveProduct = findValue(products, product => product.price > 500);
// 결과: { name: 'Laptop', price: 1000, inStock: true }

// 키 패턴으로 찾아요.
const cache = new Map([
  ['temp_1', { data: 'foo', timestamp: 100 }],
  ['perm_1', { data: 'bar', timestamp: 200 }],
  ['temp_2', { data: 'baz', timestamp: 300 }],
]);

const permanent = findValue(cache, (value, key) => key.startsWith('perm_'));
// 결과: { data: 'bar', timestamp: 200 }
```

#### 파라미터

- `map` (`Map<K, V>`): 검색할 Map이에요.
- `doesMatch` (`(value: V, key: K, map: Map<K, V>) => boolean`): 각 항목을 테스트하는 조건 함수예요.

#### 반환 값

(`V | undefined`): 조건을 만족하는 첫 번째 항목의 값을 반환하거나, 찾지 못하면 undefined를 반환해요.
