# toConstantCaseKeys

객체와 배열의 모든 키를 상수 표기법으로 변환한 새로운 객체를 반환해요.

상수 표기법은 모든 문자를 대문자로 쓰고 단어 사이를 밑줄(`_`)로 구분하는 명명 규칙이에요. 예를 들어서, `CONSTANT_CASE` 처럼 작성해요.

```typescript
const constantCased = toConstantCaseKeys(obj);
```

## 사용법

### `toConstantCaseKeys(obj)`

객체의 모든 키를 CONSTANT_CASE로 변환하고 싶을 때 `toConstantCaseKeys`를 사용하세요. 중첩된 객체와 배열 내의 객체들도 재귀적으로 변환돼요.

예를 들어, 객체의 키는 다음과 같이 변환돼요.

- `camelCase` → `CONSTANT_CASE` (예: `userId` → `USER_ID`)
- `PascalCase` → `CONSTANT_CASE` (예: `UserId` → `USER_ID`)
- `snake_case` → `CONSTANT_CASE` (예: `first_name` → `FIRST_NAME`, `last` → `LAST`)

```typescript
import { toConstantCaseKeys } from 'es-toolkit/object';

// 기본 객체 변환
const obj = { userId: 1, firstName: 'John', lastName: 'Doe' };
const result = toConstantCaseKeys(obj);
// result는 { USER_ID: 1, FIRST_NAME: 'John', LAST_NAME: 'Doe' }가 돼요

// 배열 내 객체들도 변환해요
const users = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const convertedUsers = toConstantCaseKeys(users);
// convertedUsers는 [{ USER_ID: 1, FIRST_NAME: 'John' }, { USER_ID: 2, FIRST_NAME: 'Jane' }]가 돼요

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
const nestedResult = toConstantCaseKeys(nested);
// nestedResult는 {
//   USER_DATA: {
//     USER_ID: 1,
//     CONTACT_INFO: {
//       EMAIL_ADDRESS: 'john@example.com',
//       PHONE_NUMBER: '123-456-7890'
//     }
//   }
// }가 돼요
```

#### 파라미터

- `obj` (`T`): 키를 CONSTANT_CASE로 변환할 객체, 배열, 또는 원시 값이에요.

#### 반환 값

(`ToConstantCaseKeys<T>`): 모든 키가 CONSTANT_CASE로 변환된 새로운 객체를 반환해요.
