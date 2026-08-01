# toKebabCaseKeys

객체와 배열의 모든 키를 케밥 표기법으로 변환한 새로운 객체를 반환해요.

케밥 표기법은 각 단어를 소문자로 쓰고 단어 사이를 대시(-)로 연결하는 명명 규칙이에요. 예를 들어서, `kebab-case` 처럼 작성해요.

```typescript
const kebabCased = toKebabCaseKeys(obj);
```

## 사용법

### `toKebabCaseKeys(obj)`

객체의 모든 키를 kebab-case로 변환하고 싶을 때 `toKebabCaseKeys`를 사용하세요. 중첩된 객체와 배열 내의 객체들도 재귀적으로 변환돼요.

예를 들어, 객체의 키는 다음과 같이 변환돼요.

- `camelCase` → `kebab-case` (예: `userId` → `user-id`)
- `PascalCase` → `kebab-case` (예: `UserId` → `user-id`)
- `UPPERCASE_KEYS` → `kebab-case` (예: `FIRST_NAME` → `first-name`, `LAST` → `last`)

```typescript
import { toKebabCaseKeys } from 'es-toolkit/object';

// 기본 객체 변환
const obj = { userId: 1, firstName: 'John', lastName: 'Doe' };
const result = toKebabCaseKeys(obj);
// result는 { 'user-id': 1, 'first-name': 'John', 'last-name': 'Doe' }가 돼요

// 배열 내 객체들도 변환해요
const users = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const convertedUsers = toKebabCaseKeys(users);
// convertedUsers는 [{ 'user-id': 1, 'first-name': 'John' }, { 'user-id': 2, 'first-name': 'Jane' }]가 돼요

// 중첩된 객체도 완전히 변환돼요
const nested = {
  userData: {
    userId: 1,
    contactInfo: {
      emailAddress: 'john@example.com',
      phoneNumber: '123-456-7890',
    },
  },
};
const nestedResult = toKebabCaseKeys(nested);
// nestedResult는 {
//   user_data: {
//     user_id: 1,
//     contact_info: {
//       email_address: 'john@example.com',
//       phone_number: '123-456-7890'
//     }
//   }
// }가 돼요
```

#### 파라미터

- `obj` (`T`): 키를 kebab-case로 변환할 객체, 배열, 또는 원시 값이에요.

#### 반환 값

(`ToKebabCaseKeys<T>`): 모든 키가 kebab-case로 변환된 새로운 객체를 반환해요.
