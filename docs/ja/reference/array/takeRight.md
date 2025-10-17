# takeRight

配列の最後から指定された個数だけ要素を取得して新しい配列を作ります。

```typescript
const taken = takeRight(arr, count);
```

## 参照

### `takeRight(arr, count?)`

配列の最後から何個かの要素だけが必要な場合は `takeRight` を使用してください。要求された個数が配列の長さより大きい場合は配列全体を返します。

```typescript
import { takeRight } from 'es-toolkit/array';

// 最後の2つの要素を取得します。
takeRight([1, 2, 3, 4, 5], 2);
// Returns: [4, 5]

// 最後の2つの要素を取得します。
takeRight(['a', 'b', 'c'], 2);
// Returns: ['b', 'c']
```

配列より多い個数を要求すると配列全体を返します。

```typescript
import { takeRight } from 'es-toolkit/array';

takeRight([1, 2, 3], 5);
// Returns: [1, 2, 3]
```

`count` を省略すると最後の要素だけを取得します。

```typescript
import { takeRight } from 'es-toolkit/array';

takeRight([1, 2, 3]);
// Returns: [3]
```

#### パラメータ

- `arr` (`T[]`): 要素を取得する配列です。
- `count` (`number`, オプション): 取得する要素の個数です。デフォルト値は `1` です。

#### 戻り値

(`T[]`): 配列の最後から `count` 個の要素を含む新しい配列を返します。
