# toCamelCaseKeys

객체의 프로퍼티를 [카멜 표기법](../string/camelCase.md)(`camelCase`)로 바꾼 새로운 객체를 만들어요.

중첩된 객체 안의 프로퍼티도 모두 카멜 표기법으로 변환돼요.

## 인터페이스

```typescript
function toCamelCaseKeys<T>(obj: T): ToCamelCaseKeys<T>;
```

### 파라미터

- `obj` (`T`): 키를 변환할 객체.

### 반환 값

(`ToCamelCaseKeys<T>`): 모든 키가 camelCase로 변환된 새 객체.

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
