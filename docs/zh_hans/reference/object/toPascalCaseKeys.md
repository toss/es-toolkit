# toPascalCaseKeys

返回一个将对象和数组的所有键转换为帕斯卡命名法的新对象。

帕斯卡命名法是一种命名规范，每个单词的首字母大写，单词之间不使用分隔符连接。例如 `PascalCase`。

```typescript
const pascalCased = toPascalCaseKeys(obj);
```

## 用法

### `toPascalCaseKeys(obj)`

当您想要将对象的所有键转换为帕斯卡命名法时,请使用 `toPascalCaseKeys`。嵌套对象和数组中的对象也会递归转换。

例如，对象的键会按如下方式转换：

- `snake_case` → `PascalCase`（例如 `user_id` → `UserId`）
- `camelCase` → `PascalCase`（例如 `UserId` → `UserId`）
- `UPPERCASE_KEYS` → `PascalCase`（例如 `FIRST_NAME` → `FirstName`, `LAST` → `Last`）

```typescript
import { toPascalCaseKeys } from 'es-toolkit/object';

// 基本对象转换
const obj = { user_id: 1, first_name: 'John', last_name: 'Doe' };
const result = toPascalCaseKeys(obj);
// result 是 { UserId: 1, FirstName: 'John', LastName: 'Doe' }

// 数组中的对象也会转换
const users = [
  { user_id: 1, first_name: 'John' },
  { user_id: 2, first_name: 'Jane' },
];
const convertedUsers = toPascalCaseKeys(users);
// convertedUsers 是 [{ UserId: 1, FirstName: 'John' }, { UserId: 2, FirstName: 'Jane' }]

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
const nestedResult = toPascalCaseKeys(nested);
// nestedResult 是 {
//   UserData: {
//     UserId: 1,
//     ContactInfo: {
//       EmailAddress: 'john@example.com',
//       PhoneNumber: '123-456-7890'
//     }
//   }
// }

// PascalCase 和 uppercase keys 的键也会被转换
const raw = { UserId: 1, FIRST_NAME: 'JinHo', LAST: 'Yeom' };
const converted = toPascalCaseKeys(raw);
// converted 是 { UserId: 1, FirstName: 'JinHo', Last: 'Yeom' }
```

#### 参数

- `obj` (`T`): 要将键转换为 PascalCase 的对象、数组或原始值。

#### 返回值

(`ToPascalCaseKeys<T>`): 返回所有键都已转换为 PascalCase 的新对象。
