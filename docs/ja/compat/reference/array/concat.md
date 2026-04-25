# concat (Lodash 互換性)

::: warning スプレッド演算子または[`Array#concat`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)を使用してください

この `concat` 関数は、Lodash での配列連結方式が複雑なため、非効率的に動作します。

代わりに、より直感的で現代的なスプレッド演算子 `[...arr1, ...arr2]` や、`Array#concat` を活用した `arr1.concat(arr2)` を使用してください。

:::

複数の配列と値を1つの配列に結合します。

```typescript
const result = concat(...values);
```

## 使用法

### `concat(...values)`

複数の値と配列を順番に連結して1つの新しい配列を作成したい場合、`concat` を使用してください。配列は展開され、個別の値はそのまま追加されます。

```typescript
import { concat } from 'es-toolkit/compat';

// 個別の値を連結
concat(1, 2, 3);
// Returns: [1, 2, 3]

// 配列を連結
concat([1, 2], [3, 4]);
// Returns: [1, 2, 3, 4]

// 値と配列を一緒に連結
concat(1, [2, 3], 4);
// Returns: [1, 2, 3, 4]
```

ネストされた配列は1段階のみ展開されます。

```typescript
import { concat } from 'es-toolkit/compat';

// ネストされた配列は1段階のみ展開
concat([1, [2, 3]], 4);
// Returns: [1, [2, 3], 4]

// より深くネストされた配列
concat([1, [2, [3, 4]]], 5);
// Returns: [1, [2, [3, 4]], 5]
```

空配列と空の値も処理します。

```typescript
import { concat } from 'es-toolkit/compat';

// 空配列と一緒に
concat([], [1, 2], [], [3]);
// Returns: [1, 2, 3]

// 値がない場合
concat();
// Returns: []
```

#### パラメータ

- `values` (`...(T | readonly T[])`): 連結する値と配列です。各配列は1段階展開されます。

#### 戻り値

(`T[]`): すべての値と配列の要素が順番に連結された新しい配列を返します。
