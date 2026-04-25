# gte (Lodash 互換性)

::: warning `>=` 演算子を使用してください

この `gte` 関数は `toNumber` 関数呼び出しと文字列型確認などの追加処理により遅く動作します。

代わりに、より高速で現代的な `>=` 演算子を使用してください。

:::

値が他の値より大きいか等しいかどうかを確認します。

```typescript
const result = gte(value, other);
```

## 使用法

### `gte(value, other)`

二つの値を比較して最初の値が二番目の値より大きいか等しいかどうかを確認したい時に`gte`を使用してください。文字列同士は辞書順で比較し、他の型は数値に変換して比較します。

```typescript
import { gte } from 'es-toolkit/compat';

gte(3, 1);
// Returns: true

gte(3, 3);
// Returns: true

gte(1, 3);
// Returns: false

// 文字列比較 (辞書順)
gte('def', 'abc');
// Returns: true

gte('abc', 'def');
// Returns: false

// 他の型は数値に変換されて比較
gte('10', 5);
// Returns: true (10 >= 5)

gte(1, null);
// Returns: true (1 >= 0)
```

#### パラメータ

- `value` (`unknown`): 比較する最初の値です。
- `other` (`unknown`): 比較する二番目の値です。

#### 戻り値

(`boolean`): 最初の値が二番目の値より大きいか等しければ`true`、そうでなければ`false`を返します。
