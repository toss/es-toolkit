# lte (Lodash 互換性)

::: warning `<=` 演算子を使用してください

この `lte` 関数は `toNumber` 関数呼び出しと文字列型確認などの追加処理により遅く動作します。

代わりに、より高速で現代的な `<=` 演算子を使用してください。

:::

値が他の値より小さいか等しいかどうかを確認します。

```typescript
const result = lte(value, other);
```

## 参照

### `lte(value, other)`

二つの値を比較して最初の値が二番目の値より小さいか等しいかどうかを確認したい時に`lte`を使用してください。文字列同士は辞書順で比較し、他の型は数値に変換して比較します。

```typescript
import { lte } from 'es-toolkit/compat';

lte(1, 3);
// Returns: true

lte(3, 3);
// Returns: true

lte(3, 1);
// Returns: false

// 文字列比較 (辞書順)
lte('abc', 'def');
// Returns: true

lte('def', 'abc');
// Returns: false

// 他の型は数値に変換されて比較
lte('10', 5);
// Returns: false (10 <= 5)

lte(null, 0);
// Returns: true (0 <= 0)
```

#### パラメータ

- `value` (`unknown`): 比較する最初の値です。
- `other` (`unknown`): 比較する二番目の値です。

#### 戻り値

(`boolean`): 最初の値が二番目の値より小さいか等しければ`true`、そうでなければ`false`を返します。
