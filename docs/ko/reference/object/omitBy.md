# omitBy

조건 함수를 만족하는 속성들을 제외한 새로운 객체를 반환해요.

```typescript
const result = omitBy(obj, shouldOmit);
```

## 사용법

### `omitBy(obj, shouldOmit)`

조건 함수를 기반으로 객체의 속성들을 선택적으로 제외하고 싶을 때 `omitBy`를 사용하세요. 조건 함수가 `true`를 반환하는 속성들은 제외되고, `false`를 반환하는 속성들만 포함된 새로운 객체를 반환해요.

```typescript
import { omitBy } from 'es-toolkit/object';

// 문자열 값을 가진 속성들을 제외해요
const obj = { a: 1, b: 'remove', c: 3, d: 'also remove' };
const result = omitBy(obj, value => typeof value === 'string');
// result는 { a: 1, c: 3 }이 돼요

// 짝수 값들만 제외해요
const numbers = { a: 1, b: 2, c: 3, d: 4 };
const odds = omitBy(numbers, value => value % 2 === 0);
// odds는 { a: 1, c: 3 }이 돼요

// 키와 값을 모두 활용해요
const data = { user1: 25, user2: 17, admin1: 30, admin2: 28 };
const nonAdmins = omitBy(data, (value, key) => key.startsWith('admin'));
// nonAdmins는 { user1: 25, user2: 17 }이 돼요
```

#### 파라미터

- `obj` (`T extends Record<string, any>`): 속성들을 필터링할 객체예요.
- `shouldOmit` (`(value: T[keyof T], key: keyof T) => boolean`): 속성을 제외할지 결정하는 조건 함수예요. 값과 키를 받아서 제외하려면 `true`, 유지하려면 `false`를 반환해요.

#### 반환 값

(`Partial<T>`): 조건 함수를 만족하지 않는 속성들로 구성된 새로운 객체를 반환해요.
