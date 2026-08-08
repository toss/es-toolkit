# NonEmptyArray

少なくとも 1 つ以上の要素を持つことが保証された配列型です。最初の要素が `T | undefined` ではなく `T` に絞られます。

```typescript
type Arr = NonEmptyArray<T>;
```

## 使用法

### `NonEmptyArray<T>`

「空であってはならない配列」を型レベルで表現したいときに使います。空配列は代入できず、最初の要素へのアクセスが常に `T` に絞られるため、`undefined` チェックなしで使えます。

```typescript
import type { NonEmptyArray } from 'es-toolkit/types';

const a: NonEmptyArray<number> = [1, 2, 3]; // ok
const b: NonEmptyArray<number> = [1]; // ok
const c: NonEmptyArray<number> = []; // エラー: 空配列は許可されません。

function first<T>(arr: NonEmptyArray<T>): T {
  // 最初の要素は T に絞られるため、undefined チェックは不要です。
  return arr[0];
}
```

#### 型パラメータ

- `T`: 配列要素の型です。
