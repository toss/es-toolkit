# findKey

주어진 조건을 만족하는 첫 번째 요소의 키를 찾아요.

```typescript
const key = findKey(obj, predicate);
```

## 레퍼런스

### `findKey(obj, predicate)`

객체에서 특정 조건을 만족하는 첫 번째 요소의 키를 찾고 싶을 때 `findKey`를 사용하세요. 조건 함수가 `true`를 반환하는 첫 번째 값에 대한 키를 반환해요.

```typescript
import { findKey } from 'es-toolkit/object';

// 나이가 30 미만인 첫 번째 사용자 찾기
const users = {
  alice: { age: 25, active: true },
  bob: { age: 30, active: false },
  charlie: { age: 35, active: true }
};

const youngUserKey = findKey(users, user => user.age < 30);
console.log(youngUserKey); // 'alice'

// 비활성 사용자 찾기
const inactiveUserKey = findKey(users, user => !user.active);
console.log(inactiveUserKey); // 'bob'

// 조건을 만족하는 요소가 없는 경우
const seniorUserKey = findKey(users, user => user.age > 50);
console.log(seniorUserKey); // undefined
```

조건 함수는 현재 값, 키, 전체 객체를 받아요:

```typescript
const data = {
  item1: { priority: 'high', status: 'pending' },
  item2: { priority: 'low', status: 'done' },
  item3: { priority: 'high', status: 'done' }
};

// 키 이름과 값을 모두 고려한 검색
const result = findKey(data, (value, key, obj) => {
  return key.includes('2') && value.status === 'done';
});
console.log(result); // 'item2'
```

복잡한 객체 구조에서도 사용할 수 있어요:

```typescript
const products = {
  laptop: { 
    specs: { ram: 16, cpu: 'Intel i7' },
    price: 1200,
    available: true 
  },
  phone: { 
    specs: { ram: 8, cpu: 'Snapdragon' },
    price: 800,
    available: false 
  },
  tablet: { 
    specs: { ram: 12, cpu: 'Apple M1' },
    price: 1000,
    available: true 
  }
};

const affordableKey = findKey(products, product => 
  product.price < 1000 && product.available
);
console.log(affordableKey); // undefined (조건을 만족하는 제품 없음)

const highRamKey = findKey(products, product => 
  product.specs.ram >= 12
);
console.log(highRamKey); // 'laptop'
```

#### 파라미터

- `obj` (`T extends Record<any, any>`): 검색할 객체예요.
- `predicate` (`(value: T[keyof T], key: keyof T, obj: T) => boolean`): 각 요소에 대해 실행할 조건 함수예요. `true`를 반환하는 첫 번째 요소의 키를 찾아요.

#### 반환 값

(`keyof T | undefined`): 조건을 만족하는 첫 번째 요소의 키예요. 조건을 만족하는 요소가 없으면 `undefined`를 반환해요.
