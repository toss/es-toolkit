# IsEqual

判断两个类型是否完全相同。相同为 `true`，否则为 `false`。

```typescript
type Same = IsEqual<A, B>;
```

## 用法

### `IsEqual<A, B>`

当你需要的是完全相同而不是可赋值时使用。与普通条件类型不同，它能把 `any` 与其他类型区分开，便于在类型测试中发现意外混入的 `any`。

```typescript
import type { IsEqual } from 'es-toolkit/types';

type A = IsEqual<{ a: string }, { a: string }>; // true
type B = IsEqual<string, 'literal'>; // false

// 普通条件类型无法区分，但 IsEqual 可以。
type C = IsEqual<unknown, any>; // false
type D = IsEqual<any, any>; // true
```

#### 类型参数

- `A`：要比较的第一个类型。
- `B`：要比较的第二个类型。
