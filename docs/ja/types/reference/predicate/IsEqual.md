# IsEqual

2 つの型が完全に同じかどうかを判定します。同じなら `true`、違えば `false` になります。

```typescript
type Same = IsEqual<A, B>;
```

## 使用法

### `IsEqual<A, B>`

代入可能かどうかではなく、完全に同じかどうかを比べたいときに使います。通常の条件型と違って `any` を他の型と区別できるため、型テストに紛れ込んだ `any` を見つけるのに便利です。

```typescript
import type { IsEqual } from 'es-toolkit/types';

type A = IsEqual<{ a: string }, { a: string }>; // true
type B = IsEqual<string, 'literal'>; // false

// 通常の条件型では区別できませんが、IsEqual は区別できます。
type C = IsEqual<unknown, any>; // false
type D = IsEqual<any, any>; // true
```

#### 型パラメータ

- `A`: 比較する 1 つ目の型です。
- `B`: 比較する 2 つ目の型です。
