# every (`Set`)

Set의 모든 요소가 제공된 조건 함수를 만족하는지 테스트해요.

```typescript
const allMatch = every(set, doesMatch);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/set`에서만 사용할 수 있어요.

:::

## 사용법

### `every(set, doesMatch)`

Set의 모든 요소가 특정 조건을 만족하는지 확인하고 싶을 때 `every`를 사용하세요. 각 요소를 테스트하는 조건 함수를 제공하면, 모든 요소가 조건을 만족하면 true를, 그렇지 않으면 false를 반환해줘요.

```typescript
import { every } from 'es-toolkit/set';

const set = new Set([10, 20, 30]);

const result = every(set, value => value > 5);
// 결과: true

const result2 = every(set, value => value > 15);
// 결과: false
```

다양한 조건을 테스트할 수 있어요.

```typescript
import { every } from 'es-toolkit/set';

// 모든 값이 기준을 만족하는지 확인해요.
const ages = new Set([25, 30, 35, 40]);

const allAdults = every(ages, age => age >= 18);
// 결과: true

const allSeniors = every(ages, age => age >= 65);
// 결과: false

// 객체 속성 확인해요.
const users = new Set([
  { name: 'Alice', active: true },
  { name: 'Bob', active: true },
  { name: 'Charlie', active: true },
]);

const allActive = every(users, user => user.active);
// 결과: true
```

#### 파라미터

- `set` (`Set<T>`): 테스트할 Set이에요.
- `doesMatch` (`(value: T, value2: T, set: Set<T>) => boolean`): 각 요소를 테스트하는 조건 함수예요.

#### 반환 값

(`boolean`): 모든 요소가 조건을 만족하면 true를, 그렇지 않으면 false를 반환해요.
