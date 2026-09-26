# IsEqual

判断两个类型是否完全相同。相同为 `true`，否则为 `false`。

```typescript
type Same = IsEqual<A, B>;
```

## 用法

### `IsEqual<A, B>`

`A extends B` 问的是「能不能放进去」，而 `IsEqual` 问的是「是不是同一个类型」。例如 `'literal'` 能放进 `string`，但并不是同一个类型。

它还能把 `any` 与其他类型区分开，便于在类型测试中发现意外混入的 `any`。

```typescript
import type { IsEqual } from 'es-toolkit/types';

type A = IsEqual<{ a: string }, { a: string }>; // true
type B = IsEqual<string, 'literal'>; // false

// unknown 和 any 通常无法区分，但 IsEqual 可以。
type C = IsEqual<unknown, any>; // false
type D = IsEqual<any, any>; // true
```

#### 类型参数

- `A`：要比较的第一个类型。
- `B`：要比较的第二个类型。
