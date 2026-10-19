# ToConstantCaseKeys

递归地将对象类型的所有键转换为常量命名法(CONSTANT_CASE)。这是 [`toConstantCaseKeys`](../../../reference/object/toConstantCaseKeys.md) 函数的返回类型。

```typescript
type Converted = ToConstantCaseKeys<T>;
```

## 用法

### `ToConstantCaseKeys<T>`

当您需要表示键已转换为常量命名法的数据类型时,请使用 `ToConstantCaseKeys`。例如，可以表示用 [`toConstantCaseKeys`](../../../reference/object/toConstantCaseKeys.md) 转换对象后得到的类型。嵌套对象和数组中对象的键也会递归转换。`Date`、`Map` 等内置对象和原始值保持不变。

```typescript
import type { ToConstantCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type ConstantUser = ToConstantCaseKeys<User>;
// => { USER_ID: number; FIRST_NAME: string; USER_ADDRESS: { ZIP_CODE: string } }
```

#### 类型参数

- `T`：要转换键的类型。
