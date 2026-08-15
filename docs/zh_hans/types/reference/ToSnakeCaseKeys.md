# ToSnakeCaseKeys

递归地将对象类型的所有键转换为 snake_case。这是 [`toSnakeCaseKeys`](../../reference/object/toSnakeCaseKeys.md) 函数的返回类型。

```typescript
type Converted = ToSnakeCaseKeys<T>;
```

## 用法

### `ToSnakeCaseKeys<T>`

当你需要表示键已转换为 snake_case 的数据类型时，使用 `ToSnakeCaseKeys`。例如，可以表示将请求体传入 [`toSnakeCaseKeys`](../../reference/object/toSnakeCaseKeys.md) 后得到的类型。嵌套对象和数组内对象的键也会被递归转换。`Date`、`Map` 等内置对象和原始值保持不变。

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
