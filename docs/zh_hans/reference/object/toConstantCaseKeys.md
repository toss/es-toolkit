# toConstantCaseKeys

返回一个将对象和数组的所有键转换为常量命名法的新对象。

常量命名法是一种命名规则,所有字符都大写,单词之间用下划线(`_`)分隔。。例如 `CONSTANT_CASE`。

```typescript
const constantCased = toConstantCaseKeys(obj);
```

## 用法

### `toConstantCaseKeys(obj)`

当您想要将对象的所有键转换为 CONSTANT_CASE 时,请使用 `toConstantCaseKeys`。嵌套对象和数组中的对象也会递归转换。

例如，对象的键会按如下方式转换：

- `camelCase` → `CONSTANT_CASE`（例如 `userId` → `USER_ID`）
- `PascalCase` → `CONSTANT_CASE`（例如 `UserId` → `USER_ID`）
- `snake_case` → `CONSTANT_CASE`（例如 `first_name` → `FIRST_NAME`, `last` → `LAST`）

```typescript
import { toConstantCaseKeys } from 'es-toolkit/object';

// 基本对象转换
const obj = { userId: 1, firstName: 'John', lastName: 'Doe' };
const result = toConstantCaseKeys(obj);
// result 是 { USER_ID: 1, FIRST_NAME: 'John', LAST_NAME: 'Doe' }

// 数组中的对象也会转换
const users = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const convertedUsers = toConstantCaseKeys(users);
// convertedUsers 是 [{ USER_ID: 1, FIRST_NAME: 'John' }, { USER_ID: 2, FIRST_NAME: 'Jane' }]

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
const nestedResult = toConstantCaseKeys(nested);
// nestedResult 是 {
//   USER_DATA: {
//     USER_ID: 1,
//     CONTACT_INFO: {
//       EMAIL_ADDRESS: 'john@example.com',
//       PHONE_NUMBER: '123-456-7890'
//     }
//   }
// }
```

#### 参数

- `obj` (`T`): 要将键转换为 CONSTANT_CASE 的对象、数组或原始值。

#### 返回值

(`ToConstantCaseKeys<T>`): 返回所有键都已转换为 CONSTANT_CASE 的新对象。
