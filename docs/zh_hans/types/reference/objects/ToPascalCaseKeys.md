# ToPascalCaseKeys

递归地将对象类型的所有键转换为帕斯卡命名法(PascalCase)。这是 [`toPascalCaseKeys`](../../../reference/object/toPascalCaseKeys.md) 函数的返回类型。

```typescript
type Converted = ToPascalCaseKeys<T>;
```

## 用法

### `ToPascalCaseKeys<T>`

当您需要表示键已转换为帕斯卡命名法的数据类型时,请使用 `ToPascalCaseKeys`。例如，可以表示用 [`toPascalCaseKeys`](../../../reference/object/toPascalCaseKeys.md) 转换要发送到外部 API 的数据后得到的类型。嵌套对象和数组中对象的键也会递归转换。`Date`、`Map` 等内置对象和原始值保持不变。

```typescript
import type { ToPascalCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type PascalUser = ToPascalCaseKeys<User>;
// => { UserId: number; FirstName: string; UserAddress: { ZipCode: string } }
```

#### 类型参数

- `T`：要转换键的类型。
