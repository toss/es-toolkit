# toSnakeCaseKeys

オブジェクトのプロパティを[スネークケース](../string/snakeCase.md)（`snake_case`）に変換した新しいオブジェクトを作成します。

ネストされたオブジェクト内のプロパティもすべてスネークケースに変換されます。

## インターフェース

```typescript
function toSnakeCaseKeys<T>(obj: T): ToSnakeCaseKeys<T>;
```

### パラメータ

- `obj` (`T`): キーを変換するオブジェクトです。

### 戻り値

(`ToSnakeCaseKeys<T>`): すべてのキーがスネークケースに変換された新しいオブジェクトです。

## 例

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
