# nthArg (Lodash 互換性)

::: warning アロー関数を使用してください

この `nthArg` 関数は単に特定のインデックスの引数を返すラッパー関数を作成するだけです。アロー関数を使用すれば、より簡潔で明確に同じ機能を実装できます。

代わりに、より高速で現代的なアロー関数を使用してください。

:::

指定したインデックスの引数を返す関数を生成します。

```typescript
const getNthArg = nthArg(n);
```

## 使用法

### `nthArg(n)`

関数の特定の位置にある引数だけが必要な場合は `nthArg` を使用してください。負のインデックスを使用すると、末尾から計算します。

```typescript
import { nthArg } from 'es-toolkit/compat';

// 2番目の引数を取得する関数を生成
const getSecondArg = nthArg(1);
getSecondArg('a', 'b', 'c', 'd');
// Returns: 'b'

// 最後から2番目の引数を取得する関数を生成
const getPenultimateArg = nthArg(-2);
getPenultimateArg('a', 'b', 'c', 'd');
// Returns: 'c'

// 最初の引数を取得する関数を生成(デフォルト)
const getFirstArg = nthArg();
getFirstArg('a', 'b', 'c');
// Returns: 'a'
```

配列メソッドと一緒に使用すると便利です。

```typescript
import { nthArg } from 'es-toolkit/compat';

// 各配列の2番目の要素のみを抽出
const arrays = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
arrays.map(nthArg(1));
// Returns: [2, 5, 8]
```

負のインデックスは末尾から計算します。

```typescript
import { nthArg } from 'es-toolkit/compat';

// 最後の引数を取得する関数
const getLastArg = nthArg(-1);
getLastArg('first', 'middle', 'last');
// Returns: 'last'
```

#### パラメータ

- `n` (`number`, オプション): 返す引数のインデックスです。負の値は末尾から計算します。デフォルト値は `0` です。

#### 戻り値

(`(...args: any[]) => any`): 指定したインデックスの引数を返す新しい関数を返します。
