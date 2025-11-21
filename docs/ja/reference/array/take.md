# take

配列の最初から指定された個数だけ要素を取得して新しい配列を作ります。

```typescript
const taken = take(arr, count);
```

## 使用法

### `take(arr, count?)`

配列の前から何個かの要素だけが必要な場合は `take` を使用してください。要求された個数が配列の長さより大きい場合は配列全体を返します。

```typescript
import { take } from 'es-toolkit/array';

// 最初の3つの要素を取得します。
take([1, 2, 3, 4, 5], 3);
// Returns: [1, 2, 3]

// 最初の2つの要素を取得します。
take(['a', 'b', 'c'], 2);
// Returns: ['a', 'b']
```

配列より多い個数を要求すると配列全体を返します。

```typescript
import { take } from 'es-toolkit/array';

take([1, 2, 3], 5);
// Returns: [1, 2, 3]
```

`count` を省略すると最初の要素だけを取得します。

```typescript
import { take } from 'es-toolkit/array';

take([1, 2, 3]);
// Returns: [1]
```

#### パラメータ

- `arr` (`T[]`): 要素を取得する配列です。
- `count` (`number`, オプション): 取得する要素の個数です。デフォルト値は `1` です。

#### 戻り値

(`T[]`): 配列の最初から `count` 個の要素を含む新しい配列を返します。
