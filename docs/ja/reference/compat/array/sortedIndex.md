# sortedIndex (Lodash 互換性)

::: warning バイナリ検索を直接実装してください

この `sortedIndex` 関数は、`null`、`undefined` の処理とさまざまな型のサポートにより複雑に動作します。

代わりに、より高速で現代的なバイナリ検索を直接実装するか、専用のライブラリを使用してください。

:::

ソートされた配列に値を挿入すべき最も低いインデックスを見つけます。

```typescript
const index = sortedIndex(array, value);
```

## 参照

### `sortedIndex(array, value)`

ソートされた配列に値を挿入する位置を見つけるときに `sortedIndex` を使用してください。バイナリ検索を使用して高速に位置を見つけます。

```typescript
import { sortedIndex } from 'es-toolkit/compat';

// 数値配列で挿入位置を見つける
sortedIndex([30, 50], 40);
// 1を返します（40は30と50の間に位置します）

// 文字列配列で挿入位置を見つける
sortedIndex(['a', 'c'], 'b');
// 1を返します（'b'は'a'と'c'の間に位置します）

// 同じ値が存在する場合、最初の位置を返します
sortedIndex([1, 2, 2, 3], 2);
// 1を返します（最初の2の位置）
```

`null` または `undefined` 配列は0を返します。

```typescript
import { sortedIndex } from 'es-toolkit/compat';

sortedIndex(null, 1); // 0
sortedIndex(undefined, 1); // 0
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): ソートされた配列です。ソートされていない配列を使用すると、誤った結果が得られる可能性があります。
- `value` (`T`): 挿入する値です。

#### 戻り値

(`number`): 値を挿入すべき最も低いインデックスを返します。配列が `null` または `undefined` の場合は0を返します。
