# toSnakeObject

将对象的键转换为蛇形命名（snake_case）。

此函数不会修改原始对象。

## 接口

```typescript
function toSnakeObject<T extends Record<PropertyKey, any>>(obj: T): Record<string, any>;
```

### 参数

- `obj` (`T`): 需要将键转换为蛇形命名的对象。

### 返回值

(`Record<string, any>`): 一个新对象，其中的键已转换为蛇形命名。

## 示例

```typescript
const user = {
  firstName: 'Gweesin',
  lastName: 'Chan',
  contactInfo: {
    emailAddress: 'john@example.com',
    phoneNumber: '123-456-7890'
  }
};

const formattedUser = toSnakeObject(user);
console.log(formattedUser);
// 输出: {
//   first_name: 'Gweesin',
//   last_name: 'Chan',
//   contact_info: {
//     email_address: 'john@example.com',
//     phone_number: '123-456-7890'
//   }
// }
```

## 说明

`toSnakeObject` 函数递归地将对象及其嵌套对象的所有键转换为蛇形命名。它适用于任何深度的嵌套对象，并且不会改变原始对象。

## 演示

::: sandpack

```ts index.ts
import { toSnakeObject } from 'es-toolkit';

const user = {
  firstName: 'Gweesin',
  lastName: 'Chan',
  contactInfo: {
    emailAddress: 'john@example.com',
    phoneNumber: '123-456-7890'
  }
};

const formattedUser = toSnakeObject(user);
console.log(formattedUser);
```

:::
