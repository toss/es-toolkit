# toCamelCaseKeys

オブジェクトと配列のすべてのキーをキャメルケース表記に変換した新しいオブジェクトを返します。

キャメルケース表記は、複数の単語で構成される識別子の最初の単語を小文字で書き、続く単語の最初の文字を大文字で連結する命名規則です。例えば`camelCase`のように書きます。

```typescript
const camelCased = toCamelCaseKeys(obj);
```

## 使用法

### `toCamelCaseKeys(obj)`

オブジェクトのすべてのキーをキャメルケースに変換したい時に `toCamelCaseKeys` を使用してください。ネストされたオブジェクトと配列内のオブジェクトも再帰的に変換されます。

- `snake_case` → `camelCase`（例: `user_id` → `userId`）
- `PascalCase` → `camelCase`（例: `UserId` → `userId`）
- `ALL_CAPS` → `camelCase`（例: `FIRST_NAME` → `firstName`, `LAST` → `last`）

```typescript
import { toCamelCaseKeys } from 'es-toolkit/object';

// 基本的なオブジェクト変換
const obj = { user_id: 1, first_name: 'John', last_name: 'Doe' };
const result = toCamelCaseKeys(obj);
// resultは{ userId: 1, firstName: 'John', lastName: 'Doe' }になります

// 配列内のオブジェクトも変換
const users = [
  { user_id: 1, first_name: 'John' },
  { user_id: 2, first_name: 'Jane' },
];
const convertedUsers = toCamelCaseKeys(users);
// convertedUsersは[{ userId: 1, firstName: 'John' }, { userId: 2, firstName: 'Jane' }]になります

// ネストされたオブジェクトも完全に変換
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
// nestedResultは{
//   userData: {
//     userId: 1,
//     contactInfo: {
//       emailAddress: 'john@example.com',
//       phoneNumber: '123-456-7890'
//     }
//   }
// }になります

// PascalCase と ALL_CAPS のキーも変換されます
const raw = { UserId: 1, FIRST_NAME: 'JinHo', LAST: 'Yeom' };
const converted = toCamelCaseKeys(raw);
// converted は { userId: 1, firstName: 'JinHo', last: 'Yeom' } になります
```

#### パラメータ

- `obj` (`T`): キーをcamelCaseに変換するオブジェクト、配列、またはプリミティブ値です。

#### 戻り値

(`ToCamelCaseKeys<T>`): すべてのキーがcamelCaseに変換された新しいオブジェクトを返します。
