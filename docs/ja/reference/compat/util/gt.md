# gt (Lodash 互換性)

::: warning `>` 演算子を使用してください

この `gt` 関数は `toNumber` 関数呼び出しと文字列型確認などの追加処理により遅く動作します。

代わりに、より高速で現代的な `>` 演算子を使用してください。

:::

値が他の値より大きいかどうかを確認します。

```typescript
const result = gt(value, other);
```

## 使用法

### `gt(value, other)`

二つの値を比較して最初の値が二番目の値より大きいかどうかを確認したい時に`gt`を使用してください。文字列同士は辞書順で比較し、他の型は数値に変換して比較します。

```typescript
import { gt } from 'es-toolkit/compat';

gt(3, 1);
// Returns: true

gt(3, 3);
// Returns: false

gt(1, 3);
// Returns: false

// 文字列比較 (辞書順)
gt('def', 'abc');
// Returns: true

gt('abc', 'def');
// Returns: false

// 他の型は数値に変換されて比較
gt('10', 5);
// Returns: true (10 > 5)

gt(1, null);
// Returns: true (1 > 0)
```

#### パラメータ

- `value` (`unknown`): 比較する最初の値です。
- `other` (`unknown`): 比較する二番目の値です。

#### 戻り値

(`boolean`): 最初の値が二番目の値より大きければ`true`、そうでなければ`false`を返します。
