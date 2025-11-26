# toCamelCaseKeys

返回一个将对象和数组的所有键转换为驼峰命名法的新对象。

驼峰命名法是一种将多个单词组成的标识符的首个单词小写,后续单词首字母大写的命名规范。例如 `camelCase`。

```typescript
const camelCased = toCamelCaseKeys(obj);
```

## 用法

### `toCamelCaseKeys(obj)`

当您想要将对象的所有键转换为驼峰命名法时,请使用 `toCamelCaseKeys`。嵌套对象和数组中的对象也会递归转换。

- `snake_case` → `camelCase`（例如 `user_id` → `userId`）
- `PascalCase` → `camelCase`（例如 `UserId` → `userId`）
- `ALL_CAPS` → `camelCase`（例如 `FIRST_NAME` → `firstName`, `LAST` → `last`）

```typescript
import { toCamelCaseKeys } from 'es-toolkit/object';

// 基本对象转换
const obj = { user_id: 1, first_name: 'John', last_name: 'Doe' };
const result = toCamelCaseKeys(obj);
// result 是 { userId: 1, firstName: 'John', lastName: 'Doe' }

// 数组中的对象也会转换
const users = [
  { user_id: 1, first_name: 'John' },
  { user_id: 2, first_name: 'Jane' },
];
const convertedUsers = toCamelCaseKeys(users);
// convertedUsers 是 [{ userId: 1, firstName: 'John' }, { userId: 2, firstName: 'Jane' }]

// 嵌套对象也会完全转换
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
// nestedResult 是 {
//   userData: {
//     userId: 1,
//     contactInfo: {
//       emailAddress: 'john@example.com',
//       phoneNumber: '123-456-7890'
//     }
//   }
// }

// PascalCase 和 ALL_CAPS 的键也会被转换
const raw = { UserId: 1, FIRST_NAME: 'JinHo', LAST: 'Yeom' };
const converted = toCamelCaseKeys(raw);
// converted 是 { userId: 1, firstName: 'JinHo', last: 'Yeom' }
```

#### 参数

- `obj` (`T`): 要将键转换为 camelCase 的对象、数组或原始值。

#### 返回值

(`ToCamelCaseKeys<T>`): 返回所有键都已转换为 camelCase 的新对象。
