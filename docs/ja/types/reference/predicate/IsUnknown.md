# IsUnknown

型が `unknown` かどうかを判定します。`unknown` なら `true`、そうでなければ `false` になります。

```typescript
type Result = IsUnknown<T>;
```

## 使用法

### `IsUnknown<T>`

型レベルのヘルパーで `unknown` の入力を具体的な型と区別して扱いたいときに使います。単純な `unknown extends T` 検査は `any` でも `true` になりますが、`IsUnknown` は両者を区別します。

```typescript
import type { IsUnknown } from 'es-toolkit/types';

type A = IsUnknown<unknown>; // true
type B = IsUnknown<any>; // false
type C = IsUnknown<never>; // false
type D = IsUnknown<string>; // false
```

#### 型パラメータ

- `T`: 検査する型です。
