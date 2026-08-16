# toPascalCaseKeys

객체와 배열의 모든 키를 파스칼 표기법으로 변환한 새로운 객체를 반환해요.

파스칼 표기법은 각 단어의 첫 글자를 대문자로 하고 단어 사이를 구분자 없이 연결하는 명명 규칙이에요. 예를 들어 `PascalCase`와 같이 작성해요.

```typescript
const pascalCased = toPascalCaseKeys(obj);
```

## 사용법

### `toPascalCaseKeys(obj)`

객체의 모든 키를 파스칼 케이스로 변환하고 싶을 때 `toPascalCaseKeys`를 사용하세요. 중첩된 객체와 배열 내의 객체들도 재귀적으로 변환돼요.

예를 들어, 객체의 키는 다음과 같이 변환돼요.

- `snake_case` → `PascalCase` (예: `user_id` → `UserId`)
- `camelCase` → `PascalCase` (예: `UserId` → `UserId`)
- `UPPERCASE_KEYS` → `PascalCase` (예: `FIRST_NAME` → `FirstName`, `LAST` → `Last`)

```typescript
import { toPascalCaseKeys } from 'es-toolkit/object';

// 기본 객체 변환
const obj = { user_id: 1, first_name: 'John', last_name: 'Doe' };
const result = toPascalCaseKeys(obj);
// result는 { UserId: 1, FirstName: 'John', LastName: 'Doe' }가 돼요

// 배열 내 객체들도 변환해요
const users = [
  { user_id: 1, first_name: 'John' },
  { user_id: 2, first_name: 'Jane' },
];
const convertedUsers = toPascalCaseKeys(users);
// convertedUsers는 [{ UserId: 1, FirstName: 'John' }, { UserId: 2, FirstName: 'Jane' }]가 돼요

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
const nestedResult = toPascalCaseKeys(nested);
// nestedResult는 {
//   UserData: {
//     UserId: 1,
//     ContactInfo: {
//       EmailAddress: 'john@example.com',
//       PhoneNumber: '123-456-7890'
//     }
//   }
// }가 돼요

// PascalCase와 uppercase keys 키도 변환돼요
const raw = { UserId: 1, FIRST_NAME: 'JinHo', LAST: 'Yeom' };
const converted = toPascalCaseKeys(raw);
// converted는 { UserId: 1, FirstName: 'JinHo', Last: 'Yeom' }가 돼요
```

#### 파라미터

- `obj` (`T`): 키를 PascalCase로 변환할 객체, 배열, 또는 원시 값이에요.

#### 반환 값

(`ToPascalCaseKeys<T>`): 모든 키가 PascalCase로 변환된 새로운 객체를 반환해요.
