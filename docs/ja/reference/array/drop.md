# drop

配列の先頭から指定された個数分の要素を除去した新しい配列を返します。

```typescript
const dropped = drop(arr, itemsCount);
```

## 参照

### `drop(arr, itemsCount)`

配列の先頭から一部の要素を除去したい場合は `drop` を使用してください。指定した個数分の最初の要素を除去し、残りの要素で構成された新しい配列を返します。

```typescript
import { drop } from 'es-toolkit/array';

// 配列の最初の2つの要素を除去します。
drop([1, 2, 3, 4, 5], 2);
// Returns: [3, 4, 5]

// 除去する個数が配列の長さより大きい場合、空の配列を返します。
drop([1, 2, 3], 5);
// Returns: []
```

負の数または0を渡すと、元の配列と同じ要素を持つ新しい配列を返します。

```typescript
import { drop } from 'es-toolkit/array';

drop([1, 2, 3], 0); // [1, 2, 3]
drop([1, 2, 3], -2); // [1, 2, 3]
```

#### パラメータ

- `arr` (`T[]`): 要素を除去する配列です。
- `itemsCount` (`number`): 配列の先頭から除去する要素の個数です。

#### 戻り値

(`T[]`): 先頭から指定された個数分の要素が除去された新しい配列です。
