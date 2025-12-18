# forEach (`Map`)

Map의 각 항목에 대해 제공된 함수를 한 번씩 실행해요.

```typescript
forEach(map, callbackfn);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/map`에서만 사용할 수 있어요.

:::

## 사용법

### `forEach(map, callbackfn)`

Map의 각 항목에 대해 함수를 실행하고 싶을 때 `forEach`를 사용하세요. 콜백 함수는 값, 키, 그리고 Map 자체를 인자로 받아요. 로깅, 외부 상태 업데이트, 또는 각 항목에 대한 작업 수행과 같은 부수 효과에 유용해요.

```typescript
import { forEach } from 'es-toolkit/map';

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);

forEach(map, (value, key) => {
  console.log(`${key}: ${value}`);
});
// 출력:
// a: 1
// b: 2
// c: 3
```

각 항목에 대해 다양한 작업을 수행할 수 있어요.

```typescript
import { forEach } from 'es-toolkit/map';

// 값 누적하기
const prices = new Map([
  ['apple', 1.5],
  ['banana', 0.75],
  ['orange', 2.0],
]);

let total = 0;
forEach(prices, value => {
  total += value;
});
// total은 이제 4.25예요

// 항목을 배열로 수집하기
const users = new Map([
  ['user1', { name: 'Alice', age: 25 }],
  ['user2', { name: 'Bob', age: 30 }],
]);

const userList: string[] = [];
forEach(users, (value, key) => {
  userList.push(`${key}: ${value.name} (${value.age})`);
});
// userList: ['user1: Alice (25)', 'user2: Bob (30)']

// 조건에 따라 외부 Map 업데이트하기
const inventory = new Map([
  ['item1', { stock: 10, price: 5 }],
  ['item2', { stock: 0, price: 10 }],
  ['item3', { stock: 5, price: 15 }],
]);

const outOfStock = new Map<string, any>();
forEach(inventory, (value, key) => {
  if (value.stock === 0) {
    outOfStock.set(key, value);
  }
});
// outOfStock에는 item2가 포함돼요
```

#### 파라미터

- `map` (`Map<K, V>`): 순회할 Map이에요.
- `callbackfn` (`(value: V, key: K, map: Map<K, V>) => void`): 각 항목에 대해 실행할 함수예요.

#### 반환 값

(`void`): 이 함수는 값을 반환하지 않아요.
