# dropWhile

配列の先頭から条件を満たす間、要素を除去した新しい配列を返します。

```typescript
const result = dropWhile(arr, canContinueDropping);
```

## 使用法

### `dropWhile(arr, canContinueDropping)`

配列の先頭から特定の条件を満たす要素を除去したい場合は `dropWhile` を使用してください。配列の先頭から条件関数が `true` を返す間、要素を除去し、条件関数が `false` を返すと停止します。

```typescript
import { dropWhile } from 'es-toolkit/array';

// 先頭から3より小さい要素を除去します。
const numbers = [1, 2, 3, 4, 2, 5];
dropWhile(numbers, x => x < 3);
// Returns: [3, 4, 2, 5]
// 1と2が条件を満たして除去され、3で条件がfalseになって停止します。

// オブジェクト配列から特定条件の要素を除去します。
const users = [
  { name: 'Alice', active: false },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true },
  { name: 'David', active: true },
];
dropWhile(users, user => !user.active);
// Returns: [{ name: 'Charlie', active: true }, { name: 'David', active: true }]
```

空の配列または条件を満たす要素がない場合、元の配列と同じ新しい配列を返します。

```typescript
import { dropWhile } from 'es-toolkit/array';

dropWhile([1, 2, 3], x => x > 5); // [1, 2, 3]
dropWhile([], x => true); // []
```

#### パラメータ

- `arr` (`T[]`): 要素を除去する配列です。
- `canContinueDropping` (`(item: T, index: number, arr: T[]) => boolean`): 要素を除去し続けるかを決定する条件関数です。配列の各要素とインデックス、配列全体を受け取り、真または偽を返します。

#### 戻り値

(`T[]`): 条件を満たさない要素から配列の末尾までを含む新しい配列です。
