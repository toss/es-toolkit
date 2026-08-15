# toKebabCaseKeys

オブジェクトと配列のすべてのキーをケバブケース表記に変換した新しいオブジェクトを返します。

ケバブケースは、各単語を小文字で書き、単語間をダッシュ（-）で繋ぐ命名規則です。例えば`kebab-case`のように書きます。

```typescript
const kebabCased = toKebabCaseKeys(obj);
```

## 使用法

### `toKebabCaseKeys(obj)`

オブジェクトのすべてのキーをkebab-caseに変換したい時に`toKebabCaseKeys`を使用してください。ネストされたオブジェクトと配列内のオブジェクトも再帰的に変換されます。

例えば、オブジェクトのキーは次のように変換されます。

- `camelCase` → `kebab-case`（例: `userId` → `user-id`）
- `PascalCase` → `kebab-case`（例: `UserId` → `user-id`）
- `UPPERCASE_KEYS` → `kebab-case`（例: `FIRST_NAME` → `first-name`, `LAST` → `last`）

```typescript
import { toKebabCaseKeys } from 'es-toolkit/object';

// 基本的なオブジェクト変換
const obj = { userId: 1, firstName: 'John', lastName: 'Doe' };
const result = toKebabCaseKeys(obj);
// resultは{ 'user-id': 1, 'first-name': 'John', 'last-name': 'Doe' }になります

// 配列内のオブジェクトも変換
const users = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const convertedUsers = toKebabCaseKeys(users);
// convertedUsersは[{ 'user-id': 1, 'first-name': 'John' }, { 'user-id': 2, 'first-name': 'Jane' }]になります

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
const nestedResult = toKebabCaseKeys(nested);
// nestedResultは{
//   'user-data': {
//     'user-id': 1,
//     'contact-info': {
//       'email-address': 'john@example.com',
//       'phone-number': '123-456-7890'
//     }
//   }
// }になります
```

#### パラメータ

- `obj` (`T`): キーをkebab-caseに変換するオブジェクト、配列、またはプリミティブ値です。

#### 戻り値

(`ToKebabCaseKeys<T>`): すべてのキーがkebab-caseに変換された新しいオブジェクトを返します。
