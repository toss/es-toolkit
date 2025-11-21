# slice（Lodash 互換性）

::: warning `Array.prototype.slice` を使用してください

この `slice` 関数は、`null` や `undefined` の処理とスパース配列の特別な処理により、遅く動作します。JavaScript のネイティブ `Array.prototype.slice` メソッドはより高速で標準化されています。

より高速でモダンな `Array.prototype.slice` を使用してください。

:::

配列の一部を切り取って新しい配列を作成します。

```typescript
const sliced = slice(array, start, end);
```

## 使用法

### `slice(array, start, end)`

配列の特定の部分だけが必要な場合は `slice` を使用します。開始位置から終了位置の直前までの要素を含む新しい配列を作成します。

```typescript
import { slice } from 'es-toolkit/compat';

// インデックス1から2まで切り取り
slice([1, 2, 3, 4], 1, 3);
// 戻り値：[2, 3]

// 負のインデックスを使用
slice([1, 2, 3, 4], -2);
// 戻り値：[3, 4]

// 開始位置のみ指定
slice([1, 2, 3, 4], 2);
// 戻り値：[3, 4]
```

`null` や `undefined` は空の配列として処理します。

```typescript
import { slice } from 'es-toolkit/compat';

slice(null); // []
slice(undefined); // []
```

スパース配列を処理する場合、空のスロットは `undefined` で埋められます。

```typescript
import { slice } from 'es-toolkit/compat';

const sparse = new Array(3);
sparse[1] = 'b';
slice(sparse);
// 戻り値：[undefined, 'b', undefined]
```

負のインデックスを使用すると配列の末尾から計算します。

```typescript
import { slice } from 'es-toolkit/compat';

slice([1, 2, 3, 4, 5], -3, -1);
// 戻り値：[3, 4]
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 切り取る配列。
- `start` (`number`、オプション): 開始位置。負の値は末尾から計算します。デフォルトは `0` です。
- `end` (`number`、オプション): 終了位置（含まない）。負の値は末尾から計算します。デフォルトは配列の長さです。

#### 戻り値

(`T[]`)：`start` から `end` の直前までの要素を含む新しい配列を返します。
