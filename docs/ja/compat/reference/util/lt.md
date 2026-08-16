# lt (Lodash 互換性)

::: warning `<` 演算子を使用してください

この `lt` 関数は `toNumber` 関数呼び出しと文字列型確認などの追加処理により遅く動作します。

代わりに、より高速で現代的な `<` 演算子を使用してください。

:::

値が他の値より小さいかどうかを確認します。

```typescript
const result = lt(value, other);
```

## 使用法

### `lt(value, other)`

二つの値を比較して最初の値が二番目の値より小さいかどうかを確認したい時に`lt`を使用してください。文字列同士は辞書順で比較し、他の型は数値に変換して比較します。

```typescript
import { lt } from 'es-toolkit/compat';

lt(1, 3);
// Returns: true

lt(3, 3);
// Returns: false

lt(3, 1);
// Returns: false

// 文字列比較 (辞書順)
lt('abc', 'def');
// Returns: true

lt('def', 'abc');
// Returns: false

// 他の型は数値に変換されて比較
lt('5', 10);
// Returns: true (5 < 10)

lt(null, 1);
// Returns: true (0 < 1)
```

#### パラメータ

- `value` (`unknown`): 比較する最初の値です。
- `other` (`unknown`): 比較する二番目の値です。

#### 戻り値

(`boolean`): 最初の値が二番目の値より小さければ`true`、そうでなければ`false`を返します。
