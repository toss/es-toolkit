# toSnakeCaseKeys

객체의 프로퍼티를 [스네이크 표기법](../string/snakeCase.md)(`snake_case`)로 바꾼 새로운 객체를 만들어요.

중첩된 객체 안의 프로퍼티도 모두 스네이크 표기법으로 변환돼요.

## 인터페이스

```typescript
function toSnakeCaseKeys<T>(obj: T): ToSnakeCaseKeys<T>;
```

### 파라미터

- `obj` (`T`): 키를 변환할 객체예요.

### 반환 값

(`ToSnakeCaseKeys<T>`): 모든 키가 스네이크 케이스로 변환된 새 객체예요.

## 예시

```typescript
// Example with objects
const obj = { userId: 1, firstName: 'John' };
const result = toSnakeCaseKeys(obj);
// result will be { user_id: 1, first_name: 'John' }

// Example with arrays of objects
const arr = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const arrResult = toSnakeCaseKeys(arr);
// arrResult will be [{ user_id: 1, first_name: 'John' }, { user_id: 2, first_name: 'Jane' }]

// Example with nested objects
const nested = {
  userData: {
    userId: 1,
    userAddress: {
      streetName: 'Main St',
      zipCode: '12345',
    },
  },
};
const nestedResult = toSnakeCaseKeys(nested);
// nestedResult will be:
// {
//   user_data: {
//     user_id: 1,
//     user_address: {
//       street_name: 'Main St',
//       zip_code: '12345'
//     }
//   }
// }
```
