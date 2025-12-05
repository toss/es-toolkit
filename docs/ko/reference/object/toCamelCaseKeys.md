# toCamelCaseKeys

객체와 배열의 모든 키를 카멜 표기법으로 변환한 새로운 객체를 반환해요.

카멜 표기법은 여러 단어로 구성된 식별자의 첫 단어를 소문자로 쓰고, 이어지는 단어의 첫 문자를 대문자로 연결하는 명명 규칙이에요. 예를 들어 `camelCase`와 같이 작성해요.

```typescript
const camelCased = toCamelCaseKeys(obj);
```

## 사용법

### `toCamelCaseKeys(obj)`

객체의 모든 키를 카멜 케이스로 변환하고 싶을 때 `toCamelCaseKeys`를 사용하세요. 중첩된 객체와 배열 내의 객체들도 재귀적으로 변환돼요.

- `snake_case` → `camelCase` (예: `user_id` → `userId`)
- `PascalCase` → `camelCase` (예: `UserId` → `userId`)
- `uppercase keys` → `camelCase` (예: `FIRST_NAME` → `firstName`, `LAST` → `last`)

```typescript
import { toCamelCaseKeys } from 'es-toolkit/object';

// 기본 객체 변환
const obj = { user_id: 1, first_name: 'John', last_name: 'Doe' };
const result = toCamelCaseKeys(obj);
// result는 { userId: 1, firstName: 'John', lastName: 'Doe' }가 돼요

// 배열 내 객체들도 변환해요
const users = [
  { user_id: 1, first_name: 'John' },
  { user_id: 2, first_name: 'Jane' },
];
const convertedUsers = toCamelCaseKeys(users);
// convertedUsers는 [{ userId: 1, firstName: 'John' }, { userId: 2, firstName: 'Jane' }]가 돼요

// 중첩된 객체도 완전히 변환돼요
const nested = {
  user_data: {
    user_id: 1,
    contact_info: {
      email_address: 'john@example.com',
      phone_number: '123-456-7890',
    },
  },
};
const nestedResult = toCamelCaseKeys(nested);
// nestedResult는 {
//   userData: {
//     userId: 1,
//     contactInfo: {
//       emailAddress: 'john@example.com',
//       phoneNumber: '123-456-7890'
//     }
//   }
// }가 돼요

// PascalCase와 uppercase keys 키도 변환돼요
const raw = { UserId: 1, FIRST_NAME: 'JinHo', LAST: 'Yeom' };
const converted = toCamelCaseKeys(raw);
// converted는 { userId: 1, firstName: 'JinHo', last: 'Yeom' }가 돼요
```

#### 파라미터

- `obj` (`T`): 키를 camelCase로 변환할 객체, 배열, 또는 원시 값이에요.

#### 반환 값

(`ToCamelCaseKeys<T>`): 모든 키가 camelCase로 변환된 새로운 객체를 반환해요.
