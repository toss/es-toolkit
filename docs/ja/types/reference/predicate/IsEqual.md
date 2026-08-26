# IsEqual

2 つの型が完全に同じかどうかを判定します。同じなら `true`、違えば `false` になります。

```typescript
type Same = IsEqual<A, B>;
```

## 使用法

### `IsEqual<A, B>`

`A extends B` は「入れられるか」を尋ねますが、`IsEqual` は「同じ型か」を尋ねます。たとえば `'literal'` は `string` に入れられますが、同じ型ではありません。

とくに `any` を他の型と区別できるため、型テストに紛れ込んだ `any` を見つけるのに便利です。

```typescript
import type { IsEqual } from 'es-toolkit/types';

type A = IsEqual<{ a: string }, { a: string }>; // true
type B = IsEqual<string, 'literal'>; // false

// unknown と any は通常区別されませんが、IsEqual は区別します。
type C = IsEqual<unknown, any>; // false
type D = IsEqual<any, any>; // true
```

#### 型パラメータ

- `A`: 比較する 1 つ目の型です。
- `B`: 比較する 2 つ目の型です。
