# IsAny

判断类型是否为 `any`。是 `any` 为 `true`,否则为 `false`。

```typescript
type Result = IsAny<T>;
```

## 用法

### `IsAny<T>`

当类型级别的工具需要把 `any` 与其他类型区别对待时使用。`any` 能双向通过所有 `extends` 检查,因此普通的条件类型无法区分它。

```typescript
import type { IsAny } from 'es-toolkit/types';

type A = IsAny<any>; // true
type B = IsAny<unknown>; // false
type C = IsAny<never>; // false
type D = IsAny<string>; // false
```

#### 类型参数

- `T`:要检查的类型。
