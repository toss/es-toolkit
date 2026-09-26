# ToKebabCaseKeys

递归地将对象类型的所有键转换为短横线命名法(kebab-case)。这是 [`toKebabCaseKeys`](../../../reference/object/toKebabCaseKeys.md) 函数的返回类型。

```typescript
type Converted = ToKebabCaseKeys<T>;
```

## 用法

### `ToKebabCaseKeys<T>`

当您需要表示键已转换为短横线命名法的数据类型时,请使用 `ToKebabCaseKeys`。例如，可以表示用 [`toKebabCaseKeys`](../../../reference/object/toKebabCaseKeys.md) 转换对象后得到的类型。嵌套对象和数组中对象的键也会递归转换。`Date`、`Map` 等内置对象和原始值保持不变。

```typescript
import type { ToKebabCaseKeys } from 'es-toolkit/types';

type User = {
  userId: number;
  firstName: string;
  userAddress: { zipCode: string };
};

type KebabUser = ToKebabCaseKeys<User>;
// => { 'user-id': number; 'first-name': string; 'user-address': { 'zip-code': string } }
```

#### 类型参数

- `T`：要转换键的类型。
