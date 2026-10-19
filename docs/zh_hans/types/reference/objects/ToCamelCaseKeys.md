# ToCamelCaseKeys

递归地将对象类型的所有键转换为驼峰命名法(camelCase)。这是 [`toCamelCaseKeys`](../../../reference/object/toCamelCaseKeys.md) 函数的返回类型。

```typescript
type Converted = ToCamelCaseKeys<T>;
```

## 用法

### `ToCamelCaseKeys<T>`

当您需要表示键已转换为驼峰命名法的数据类型时,请使用 `ToCamelCaseKeys`。例如，可以表示用 [`toCamelCaseKeys`](../../../reference/object/toCamelCaseKeys.md) 转换 API 响应后得到的类型。嵌套对象和数组中对象的键也会递归转换。`Date`、`Map` 等内置对象和原始值保持不变。

```typescript
import type { ToCamelCaseKeys } from 'es-toolkit/types';

type ApiUser = {
  user_id: number;
  first_name: string;
  user_address: { zip_code: string };
};

type User = ToCamelCaseKeys<ApiUser>;
// => { userId: number; firstName: string; userAddress: { zipCode: string } }
```

#### 类型参数

- `T`：要转换键的类型。
