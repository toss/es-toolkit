# filter (`Set`)

조건 함수에 따라 Set을 필터링해요.

```typescript
const filtered = filter(set, callback);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/set`에서만 사용할 수 있어요.

:::

## 사용법

### `filter(set, callback)`

특정 조건을 만족하는 요소만 포함하는 새로운 Set을 만들고 싶을 때 `filter`를 사용하세요. 각 요소를 테스트하는 조건 함수를 제공하면, 조건이 true를 반환하는 요소만으로 구성된 새 Set을 반환해줘요.

```typescript
import { filter } from 'es-toolkit/set';

const set = new Set([1, 2, 3, 4, 5]);

const result = filter(set, value => value > 2);
// 결과: Set(3) { 3, 4, 5 }
```

다양한 기준으로 필터링할 수 있어요.

```typescript
import { filter } from 'es-toolkit/set';

// 값 타입으로 필터링해요.
const numbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const evenNumbers = filter(numbers, num => num % 2 === 0);
// 결과: Set(5) { 2, 4, 6, 8, 10 }

// 객체 필터링해요.
const products = new Set([
  { name: 'Laptop', price: 1000, available: true },
  { name: 'Mouse', price: 25, available: false },
  { name: 'Keyboard', price: 75, available: true },
]);

const availableProducts = filter(products, product => product.available);
// 결과: Laptop과 Keyboard를 가진 Set
```

#### 파라미터

- `set` (`Set<T>`): 필터링할 Set이에요.
- `callback` (`(value: T, value2: T, set: Set<T>) => boolean`): 각 요소를 테스트하는 조건 함수예요.

#### 반환 값

(`Set<T>`): 조건을 만족하는 요소만 포함하는 새로운 Set을 반환해요.
