# toCamelCaseKeys

オブジェクトのプロパティを[キャメルケース](../string/camelCase.md)（`camelCase`）に変換した新しいオブジェクトを作成します。

ネストされたオブジェクト内のプロパティもすべてキャメルケースに変換されます。

## インターフェース

```typescript
function toCamelCaseKeys<T>(obj: T): ToCamelCaseKeys<T>;
```

### パラメータ

- `obj` (`T`): キーを変換するオブジェクト.

### 戻り値

(`ToCamelCaseKeys<T>`): すべてのキーがキャメルケースに変換された新しいオブジェクト。

## 例

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
