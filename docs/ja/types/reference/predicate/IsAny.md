# IsAny

型が `any` かどうかを判定します。`any` なら `true`、そうでなければ `false` になります。

```typescript
type Result = IsAny<T>;
```

## 使用法

### `IsAny<T>`

型レベルのヘルパーで `any` を他の型と区別して扱う必要があるときに使います。`any` はあらゆる `extends` 検査を双方向に通過するため、通常の条件型では区別できません。

```typescript
import type { IsAny } from 'es-toolkit/types';

type A = IsAny<any>; // true
type B = IsAny<unknown>; // false
type C = IsAny<never>; // false
type D = IsAny<string>; // false
```

#### 型パラメータ

- `T`: 検査する型です。
