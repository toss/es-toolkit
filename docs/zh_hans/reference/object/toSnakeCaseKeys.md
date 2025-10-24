# toSnakeCaseKeys

返回一个将对象和数组的所有键转换为蛇形命名法的新对象。

蛇形命名法是一种将多个单词组成的标识符中每个单词小写,并用下划线(`_`)连接的命名规范。例如 `snake_case`。

```typescript
const snakeCased = toSnakeCaseKeys(obj);
```

## 参考

### `toSnakeCaseKeys(obj)`

当您想要将对象的所有键转换为 snake_case 时,请使用 `toSnakeCaseKeys`。嵌套对象和数组中的对象也会递归转换。

```typescript
import { toSnakeCaseKeys } from 'es-toolkit/object';

// 基本对象转换
const obj = { userId: 1, firstName: 'John', lastName: 'Doe' };
const result = toSnakeCaseKeys(obj);
// result 是 { user_id: 1, first_name: 'John', last_name: 'Doe' }

// 数组中的对象也会转换
const users = [
  { userId: 1, firstName: 'John' },
  { userId: 2, firstName: 'Jane' },
];
const convertedUsers = toSnakeCaseKeys(users);
// convertedUsers 是 [{ user_id: 1, first_name: 'John' }, { user_id: 2, first_name: 'Jane' }]

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
const nestedResult = toSnakeCaseKeys(nested);
// nestedResult 是 {
//   user_data: {
//     user_id: 1,
//     contact_info: {
//       email_address: 'john@example.com',
//       phone_number: '123-456-7890'
//     }
//   }
// }
```

#### 参数

- `obj` (`T`): 要将键转换为 snake_case 的对象、数组或原始值。

#### 返回值

(`ToSnakeCaseKeys<T>`): 返回所有键都已转换为 snake_case 的新对象。
