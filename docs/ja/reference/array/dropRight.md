# dropRight

配列の末尾から指定された個数分の要素を除去した新しい配列を返します。

```typescript
const dropped = dropRight(arr, itemsCount);
```

## 参照

### `dropRight(arr, itemsCount)`

配列の末尾から一部の要素を除去したい場合は `dropRight` を使用してください。指定した個数分の最後の要素を除去し、残りの要素で構成された新しい配列を返します。

```typescript
import { dropRight } from 'es-toolkit/array';

// 配列の最後の2つの要素を除去します。
dropRight([1, 2, 3, 4, 5], 2);
// Returns: [1, 2, 3]

// 除去する個数が配列の長さより大きい場合、空の配列を返します。
dropRight([1, 2, 3], 5);
// Returns: []
```

負の数または0を渡すと、元の配列と同じ要素を持つ新しい配列を返します。

```typescript
import { dropRight } from 'es-toolkit/array';

dropRight([1, 2, 3], 0); // [1, 2, 3]
dropRight([1, 2, 3], -2); // [1, 2, 3]
```

#### パラメータ

- `arr` (`T[]`): 要素を除去する配列です。
- `itemsCount` (`number`): 配列の末尾から除去する要素の個数です。

#### 戻り値

(`T[]`): 末尾から指定された個数分の要素が除去された新しい配列です。
