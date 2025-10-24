# toSnakeCaseKeys

オブジェクトと配列のすべてのキーをスネークケース表記に変換した新しいオブジェクトを返します。

スネークケース表記は、複数の単語で構成される識別子の各単語を小文字で書き、単語の間をアンダースコア(`_`)で連結する命名規則です。例えば`snake_case`のように書きます。

```typescript
const snakeCased = toSnakeCaseKeys(obj);
```

## 参照

### `toSnakeCaseKeys(obj)`

オブジェクトのすべてのキーをsnake_caseに変換したい時に`toSnakeCaseKeys`を使用してください。ネストされたオブジェクトと配列内のオブジェクトも再帰的に変換されます。

```typescript
import { toSnakeCaseKeys } from 'es-toolkit/object';

// 基本的なオブジェクト変換
const obj = { userId: 1, firstName: 'John', lastName: 'Doe' };
const result = toSnakeCaseKeys(obj);
// resultは{ user_id: 1, first_name: 'John', last_name: 'Doe' }になります

// 配列内のオブジェクトも変換
const users = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const convertedUsers = toSnakeCaseKeys(users);
// convertedUsersは[{ user_id: 1, first_name: 'John' }, { user_id: 2, first_name: 'Jane' }]になります

// ネストされたオブジェクトも完全に変換
const nested = {
  userData: {
    userId: 1,
    contactInfo: {
      emailAddress: 'john@example.com',
      phoneNumber: '123-456-7890',
    },
  },
};
const nestedResult = toSnakeCaseKeys(nested);
// nestedResultは{
//   user_data: {
//     user_id: 1,
//     contact_info: {
//       email_address: 'john@example.com',
//       phone_number: '123-456-7890'
//     }
//   }
// }になります
```

#### パラメータ

- `obj` (`T`): キーをsnake_caseに変換するオブジェクト、配列、またはプリミティブ値です。

#### 戻り値

(`ToSnakeCaseKeys<T>`): すべてのキーがsnake_caseに変換された新しいオブジェクトを返します。
