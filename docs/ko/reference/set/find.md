# find (`Set`)

조건 함수가 true를 반환하는 Set의 첫 번째 요소를 찾아요.

```typescript
const element = find(set, doesMatch);
```

::: info

이 함수는 다른 컬렉션 유형의 유사한 함수와의 잠재적 충돌을 피하기 위해 `es-toolkit/set`에서만 사용할 수 있어요.

:::

## 사용법

### `find(set, doesMatch)`

특정 조건과 일치하는 Set의 첫 번째 요소를 찾고 싶을 때 `find`를 사용하세요. 각 요소를 테스트하는 조건 함수를 제공하면, 처음으로 일치하는 요소를 반환하거나 찾지 못하면 undefined를 반환해줘요.

```typescript
import { find } from 'es-toolkit/set';

const set = new Set([
  { name: 'apple', quantity: 10 },
  { name: 'banana', quantity: 5 },
  { name: 'grape', quantity: 15 },
]);

const result = find(set, value => value.quantity > 10);
// 결과: { name: 'grape', quantity: 15 }
```

다양한 기준으로 검색할 수 있어요.

```typescript
import { find } from 'es-toolkit/set';

// 값의 속성으로 찾아요.
const users = new Set([
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
]);

const senior = find(users, user => user.age >= 35);
// 결과: { id: 3, name: 'Charlie', age: 35 }

// 문자열 패턴으로 찾아요.
const emails = new Set(['user@example.com', 'admin@example.com', 'info@company.com']);

const adminEmail = find(emails, email => email.startsWith('admin'));
// 결과: 'admin@example.com'
```

#### 파라미터

- `set` (`Set<T>`): 검색할 Set이에요.
- `doesMatch` (`(value: T, value2: T, set: Set<T>) => boolean`): 각 요소를 테스트하는 조건 함수예요.

#### 반환 값

(`T | undefined`): 조건을 만족하는 첫 번째 요소를 반환하거나, 찾지 못하면 undefined를 반환해요.
