# toCamelCaseKeys

객체와 배열의 모든 키를 카멜케이스로 변환한 새로운 객체를 반환해요.

```typescript
const camelCased = toCamelCaseKeys(obj);
```

## 레퍼런스

### `toCamelCaseKeys(obj)`

객체의 모든 키를 camelCase로 변환하고 싶을 때 `toCamelCaseKeys`를 사용하세요. 중첩된 객체와 배열 내의 객체들도 재귀적으로 변환돼요.

```typescript
import { toCamelCaseKeys } from 'es-toolkit/object';

// 기본 객체 변환
const obj = { user_id: 1, first_name: 'John', last_name: 'Doe' };
const result = toCamelCaseKeys(obj);
// result는 { userId: 1, firstName: 'John', lastName: 'Doe' }가 돼요

// 배열 내 객체들도 변환해요
const users = [
  { user_id: 1, first_name: 'John' },
  { user_id: 2, first_name: 'Jane' }
];
const convertedUsers = toCamelCaseKeys(users);
// convertedUsers는 [{ userId: 1, firstName: 'John' }, { userId: 2, firstName: 'Jane' }]가 돼요

// 중첩된 객체도 완전히 변환돼요
const nested = {
  user_data: {
    user_id: 1,
    contact_info: {
      email_address: 'john@example.com',
      phone_number: '123-456-7890'
    }
  }
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
```

#### 파라미터

- `obj` (`T`): 키를 camelCase로 변환할 객체, 배열, 또는 원시 값이에요.

#### 반환 값

(`ToCamelCaseKeys<T>`): 모든 키가 camelCase로 변환된 새로운 객체를 반환해요.

## 예시

```typescript
// Example with objects
const obj = { user_id: 1, first_name: 'John' };
const result = toCamelCaseKeys(obj);
// result will be { userId: 1, firstName: 'John' }

// Example with arrays of objects
const arr = [
  { user_id: 1, first_name: 'John' },
  { user_id: 2, first_name: 'Jane' },
];
const arrResult = toCamelCaseKeys(arr);
// arrResult will be [{ userId: 1, firstName: 'John' }, { userId: 2, firstName: 'Jane' }]

// Example with nested objects
const nested = {
  user_data: {
    user_id: 1,
    user_address: {
      street_name: 'Main St',
      zip_code: '12345',
    },
  },
};
const nestedResult = toCamelCaseKeys(nested);
// nestedResult will be:
// {
//   userData: {
//     userId: 1,
//     userAddress: {
//       streetName: 'Main St',
//       zipCode: '12345'
//     }
//   }
// }
```
