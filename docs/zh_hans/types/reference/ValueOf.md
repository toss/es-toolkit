# ValueOf

创建对象所有值类型的联合。`keyof` 收集键，而 `ValueOf` 收集值。

```typescript
type Values = ValueOf<T>;
```

## 用法

### `ValueOf<T>`

当你只想以联合的形式取出对象类型的值侧类型时使用。在从 `as const` 对象构建值的联合时尤其方便。

```typescript
import type { ValueOf } from 'es-toolkit/types';

const STATUS = { IDLE: 'idle', LOADING: 'loading', ERROR: 'error' } as const;

// keyof 收集键，ValueOf 收集值。
type StatusKey = keyof typeof STATUS; // 'IDLE' | 'LOADING' | 'ERROR'
type Status = ValueOf<typeof STATUS>; // 'idle' | 'loading' | 'error'

// 对普通对象类型同样有效。
type Values = ValueOf<{ id: number; name: string }>; // number | string

// Record 会收窄为其值类型。
type Numbers = ValueOf<Record<string, number>>; // number
```

#### 类型参数

- `T`：要读取值类型的对象类型。
