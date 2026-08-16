# ToSnakeCaseKeys

递归地将对象类型的所有键转换为蛇形命名法(snake_case)。这是 [`toSnakeCaseKeys`](../../reference/object/toSnakeCaseKeys.md) 函数的返回类型。

```typescript
type Converted = ToSnakeCaseKeys<T>;
```

## 用法

### `ToSnakeCaseKeys<T>`

当您需要表示键已转换为蛇形命名法的数据类型时,请使用 `ToSnakeCaseKeys`。例如，可以表示用 [`toSnakeCaseKeys`](../../reference/object/toSnakeCaseKeys.md) 转换请求体后得到的类型。嵌套对象和数组中对象的键也会递归转换。`Date`、`Map` 等内置对象和原始值保持不变。

```typescript
import type { ToSnakeCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type ApiUser = ToSnakeCaseKeys<User>;
// => { user_id: number; first_name: string; user_address: { zip_code: string } }
```

#### 类型参数

- `T`：要转换键的类型。
