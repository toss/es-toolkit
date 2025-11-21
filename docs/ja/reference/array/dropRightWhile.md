# dropRightWhile

配列の末尾から条件を満たす間、要素を除去した新しい配列を返します。

```typescript
const result = dropRightWhile(arr, canContinueDropping);
```

## 使用法

### `dropRightWhile(arr, canContinueDropping)`

配列の末尾から特定の条件を満たす要素を除去したい場合は `dropRightWhile` を使用してください。配列の末尾から開始し、条件関数が `true` を返す間、要素を除去し、条件関数が `false` を返すと停止します。

```typescript
import { dropRightWhile } from 'es-toolkit/array';

// 末尾から3より大きい要素を除去します。
const numbers = [1, 2, 3, 4, 5];
dropRightWhile(numbers, x => x > 3);
// Returns: [1, 2, 3]
// 4と5が条件を満たして除去され、3で条件がfalseになって停止します。

// オブジェクト配列から特定条件の要素を除去します。
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: true },
  { name: 'Charlie', active: false },
  { name: 'David', active: false },
];
dropRightWhile(users, user => !user.active);
// Returns: [{ name: 'Alice', active: true }, { name: 'Bob', active: true }]
```

空の配列または条件を満たす要素がない場合、元の配列と同じ新しい配列を返します。

```typescript
import { dropRightWhile } from 'es-toolkit/array';

dropRightWhile([1, 2, 3], x => x > 5); // [1, 2, 3]
dropRightWhile([], x => true); // []
```

#### パラメータ

- `arr` (`T[]`): 要素を除去する配列です。
- `canContinueDropping` (`(item: T, index: number, arr: T[]) => boolean`): 要素を除去し続けるかを決定する条件関数です。配列の各要素とインデックス、配列全体を受け取り、真または偽を返します。

#### 戻り値

(`T[]`): 条件を満たさない要素から配列の先頭までを含む新しい配列です。
