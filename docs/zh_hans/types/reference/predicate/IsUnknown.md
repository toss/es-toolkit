# IsUnknown

判断类型是否为 `unknown`。是 `unknown` 为 `true`,否则为 `false`。

```typescript
type Result = IsUnknown<T>;
```

## 用法

### `IsUnknown<T>`

当类型级别的工具需要把 `unknown` 输入与具体类型区别对待时使用。简单的 `unknown extends T` 检查对 `any` 也会返回 `true`,而 `IsUnknown` 能区分两者。

```typescript
import type { IsUnknown } from 'es-toolkit/types';

type A = IsUnknown<unknown>; // true
type B = IsUnknown<any>; // false
type C = IsUnknown<never>; // false
type D = IsUnknown<string>; // false
```

#### 类型参数

- `T`:要检查的类型。
