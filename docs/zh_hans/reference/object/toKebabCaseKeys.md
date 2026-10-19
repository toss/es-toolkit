# toKebabCaseKeys

返回一个将对象和数组的所有键转换为短横线命名法的新对象。

短横线命名法是一种命名约定，其中每个单词都以小写字母书写，并用短横线（-）连接。例如 `kebab-case`。

```typescript
const snakeCased = toKebabCaseKeys(obj);
```

## 用法

### `toKebabCaseKeys(obj)`

当您想要将对象的所有键转换为 kebab-case 时,请使用 `toKebabCaseKeys`。嵌套对象和数组中的对象也会递归转换。

例如，对象的键会按如下方式转换：

- `camelCase` → `kebab-case`（例如 `userId` → `user-id`）
- `PascalCase` → `kebab-case`（例如 `UserId` → `user-id`）
- `UPPERCASE_KEYS` → `kebab-case`（例如 `FIRST_NAME` → `first-name`, `LAST` → `last`）

```typescript
import { toKebabCaseKeys } from 'es-toolkit/object';

// 基本对象转换
const obj = { userId: 1, firstName: 'John', lastName: 'Doe' };
const result = toKebabCaseKeys(obj);
// result 是 { 'user-id': 1, 'first-name': 'John', 'last-name': 'Doe' }

// 数组中的对象也会转换
const users = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const convertedUsers = toKebabCaseKeys(users);
// convertedUsers 是 [{ 'user-id': 1, 'first-name': 'John' }, { 'user-id': 2, 'first-name': 'Jane' }]

// 嵌套对象也会完全转换
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
// nestedResult 是 {
//   'user-data': {
//     'user-id': 1,
//     'contact-info': {
//       'email-address': 'john@example.com',
//       'phone-number': '123-456-7890'
//     }
//   }
// }
```

#### 参数

- `obj` (`T`): 要将键转换为 kebab-case 的对象、数组或原始值。

#### 返回值

(`ToKebabCaseKeys<T>`): 返回所有键都已转换为 kebab-case 的新对象。
