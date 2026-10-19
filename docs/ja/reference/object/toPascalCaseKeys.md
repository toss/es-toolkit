# toCamelCaseKeys

オブジェクトと配列のすべてのキーをパスカルケース表記に変換した新しいオブジェクトを返します。

パスカルケースは、各単語の最初の文字を大文字にし、単語間を区切り文字なしで連結する命名規則です。例えば`PascalCase`のように書きます。

```typescript
const pascalCased = toPascalCaseKeys(obj);
```

## 使用法

### `toPascalCaseKeys(obj)`

オブジェクトのすべてのキーをパスカルケースに変換したい時に `toPascalCaseKeys` を使用してください。ネストされたオブジェクトと配列内のオブジェクトも再帰的に変換されます。

例えば、オブジェクトのキーは次のように変換されます。

- `snake_case` → `PascalCase`（例: `user_id` → `UserId`）
- `camelCase` → `PascalCase`（例: `UserId` → `UserId`）
- `UPPERCASE_KEYS` → `PascalCase`（例: `FIRST_NAME` → `FirstName`, `LAST` → `Last`）

```typescript
import { toPascalCaseKeys } from 'es-toolkit/object';

// 基本的なオブジェクト変換
const obj = { user_id: 1, first_name: 'John', last_name: 'Doe' };
const result = toPascalCaseKeys(obj);
// resultは{ UserId: 1, FirstName: 'John', LastName: 'Doe' }になります

// 配列内のオブジェクトも変換
const users = [
  { user_id: 1, first_name: 'John' },
  { user_id: 2, first_name: 'Jane' },
];
const convertedUsers = toPascalCaseKeys(users);
// convertedUsersは[{ UserId: 1, FirstName: 'John' }, { UserId: 2, FirstName: 'Jane' }]になります

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
const nestedResult = toPascalCaseKeys(nested);
// nestedResultは{
//   UserData: {
//     UserId: 1,
//     ContactInfo: {
//       EmailAddress: 'john@example.com',
//       PhoneNumber: '123-456-7890'
//     }
//   }
// }になります

// camelCase と uppercase keys のキーも変換されます
const raw = { userId: 1, FIRST_NAME: 'JinHo', LAST: 'Yeom' };
const converted = toPascalCaseKeys(raw);
// converted は { UserId: 1, FirstName: 'JinHo', Last: 'Yeom' } になります
```

#### パラメータ

- `obj` (`T`): キーをPascalCaseに変換するオブジェクト、配列、またはプリミティブ値です。

#### 戻り値

(`ToPascalCaseKeys<T>`): すべてのキーがPascalCaseeに変換された新しいオブジェクトを返します。
