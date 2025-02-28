# toSnakeObject

객체의 키를 스네이크 케이스(snake_case)로 변환합니다.

이 함수는 원본 객체를 수정하지 않습니다.

## 인터페이스

```typescript
function toSnakeObject<T extends Record<PropertyKey, any>>(obj: T): Record<string, any>;
```

### 매개변수

- `obj` (`T`): 키를 스네이크 케이스로 변환할 객체.

### 반환 값

(`Record<string, any>`): 키가 스네이크 케이스로 변환된 새 객체.

## 예제

```typescript
const user = {
  firstName: 'Gweesin',
  lastName: 'Chan',
  contactInfo: {
    emailAddress: 'john@example.com',
    phoneNumber: '123-456-7890'
  }
};

const formattedUser = toSnakeObject(user);
console.log(formattedUser);
// 출력: {
//   first_name: 'Gweesin',
//   last_name: 'Chan',
//   contact_info: {
//     email_address: 'john@example.com',
//     phone_number: '123-456-7890'
//   }
// }
```

## 설명

`toSnakeObject` 함수는 객체와 그 중첩된 객체의 모든 키를 재귀적으로 스네이크 케이스로 변환합니다. 이 함수는 어떤 깊이의 중첩 객체에도 적용 가능하며, 원본 객체를 변경하지 않습니다.

## 데모

::: sandpack

```ts index.ts
import { toSnakeObject } from 'es-toolkit';

const user = {
  firstName: 'Gweesin',
  lastName: 'Chan',
  contactInfo: {
    emailAddress: 'john@example.com',
    phoneNumber: '123-456-7890'
  }
};

const formattedUser = toSnakeObject(user);
console.log(formattedUser);
```

:::
