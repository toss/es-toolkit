# toConstantCaseKeys

オブジェクトと配列のすべてのキーを定数ケース表記に変換した新しいオブジェクトを返します。

定数ケースはすべての文字を大文字で書き、単語の間をアンダースコア(`_`)で区切る命名規則です。例えば`CONSTANT_CASE`のように書きます。

```typescript
const constantCased = toConstantCaseKeys(obj);
```

## 使用法

### `toConstantCaseKeys(obj)`

オブジェクトのすべてのキーをCONSTANT_CASEに変換したい時に`toConstantCaseKeys`を使用してください。ネストされたオブジェクトと配列内のオブジェクトも再帰的に変換されます。

例えば、オブジェクトのキーは次のように変換されます。

- `camelCase` → `CONSTANT_CASE`（例: `userId` → `USER_ID`）
- `PascalCase` → `CONSTANT_CASE`（例: `UserId` → `USER_ID`）
- `snake_case` → `CONSTANT_CASE`（例: `first_name` → `FIRST_NAME`, `last` → `LAST`）

```typescript
import { toConstantCaseKeys } from 'es-toolkit/object';

// 基本的なオブジェクト変換
const obj = { userId: 1, firstName: 'John', lastName: 'Doe' };
const result = toConstantCaseKeys(obj);
// resultは{ USER_ID: 1, FIRST_NAME: 'John', LAST_NAME: 'Doe' }になります

// 配列内のオブジェクトも変換
const users = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const convertedUsers = toConstantCaseKeys(users);
// convertedUsersは[{ USER_ID: 1, FIRST_NAME: 'John' }, { USER_ID: 2, FIRST_NAME: 'Jane' }]になります

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
const nestedResult = toConstantCaseKeys(nested);
// nestedResultは{
//   USER_DATA: {
//     USER_ID: 1,
//     CONTACT_INFO: {
//       EMAIL_ADDRESS: 'john@example.com',
//       PHONE_NUMBER: '123-456-7890'
//     }
//   }
// }になります
```

#### パラメータ

- `obj` (`T`): キーをCONSTANT_CASEに変換するオブジェクト、配列、またはプリミティブ値です。

#### 戻り値

(`ToConstantCaseKeys<T>`): すべてのキーがCONSTANT_CASEに変換された新しいオブジェクトを返します。
