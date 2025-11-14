# toFilled

配列の一部または全体を指定された値で埋めて新しい配列を作ります。

```typescript
const filled = toFilled(arr, value, start?, end?);
```

## 使用法

### `toFilled(arr, value, start?, end?)`

配列の特定の範囲を指定された値で埋めたい場合は `toFilled` を使用してください。元の配列を変更せず、新しい配列を作成して返します。

```typescript
import { toFilled } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5];

// インデックス2から最後まで'*'で埋めます。
toFilled(array, '*', 2);
// Returns: [1, 2, '*', '*', '*']

// インデックス1から4の前まで'*'で埋めます。
toFilled(array, '*', 1, 4);
// Returns: [1, '*', '*', '*', 5]
```

開始位置と終了位置を省略すると配列全体を埋めます。

```typescript
import { toFilled } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5];

toFilled(array, '*');
// Returns: ['*', '*', '*', '*', '*']
```

負のインデックスも使用できます。配列の最後から計算します。

```typescript
import { toFilled } from 'es-toolkit/array';

const array = [1, 2, 3, 4, 5];

// 後ろから4番目から後ろから1番目の前まで'*'で埋めます。
toFilled(array, '*', -4, -1);
// Returns: [1, '*', '*', '*', 5]
```

#### パラメータ

- `arr` (`T[]`): 元となる配列です。
- `value` (`U`): 配列を埋める値です。
- `start` (`number`, オプション): 埋め始める位置です。デフォルト値は `0` です。
- `end` (`number`, オプション): 埋め終わる位置です。デフォルト値は配列の長さです。

#### 戻り値

(`Array<T | U>`): 指定された範囲が値で埋められた新しい配列を返します。元の配列は変更されません。
