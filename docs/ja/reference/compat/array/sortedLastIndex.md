# sortedLastIndex (Lodash 互換性)

::: warning バイナリ検索を直接実装してください

この `sortedLastIndex` 関数は、複雑なバイナリ検索処理と型検証により遅く動作します。

代わりに、より高速で現代的なバイナリ検索を直接実装してください。

:::

ソートされた配列に値を挿入すべき最も高いインデックスを見つけます。

```typescript
const index = sortedLastIndex(array, value);
```

## 参照

### `sortedLastIndex(array, value)`

ソートされた配列に値を挿入する最も高い位置を見つけるときに `sortedLastIndex` を使用してください。重複した値がある場合、最後の位置の後のインデックスを返します。

```typescript
import { sortedLastIndex } from 'es-toolkit/compat';

// 重複した値がある配列で最後の挿入位置を見つける
sortedLastIndex([4, 5, 5, 5, 6], 5);
// 4を返します（最後の5の後の位置）

// 新しい値の挿入位置を見つける
sortedLastIndex([10, 20, 30], 25);
// 2を返します（25は30の前に位置します）

// 値が存在しない場合
sortedLastIndex([1, 2, 3], 0);
// 0を返します（最前面に位置します）
```

`null` または `undefined` 配列は0を返します。

```typescript
import { sortedLastIndex } from 'es-toolkit/compat';

sortedLastIndex(null, 1); // 0
sortedLastIndex(undefined, 1); // 0
```

#### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): ソートされた配列です。ソートされていない配列を使用すると、誤った結果が得られる可能性があります。
- `value` (`T`): 挿入する値です。

#### 戻り値

(`number`): 値を挿入すべき最も高いインデックスを返します。配列が `null` または `undefined` の場合は0を返します。
