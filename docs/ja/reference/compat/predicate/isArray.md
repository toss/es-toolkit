# isArray (Lodash互換性)

::: warning `Array.isArray`を使用してください

この`isArray`関数は追加の関数呼び出しにより動作が遅くなります。

代わりに、より速く現代的な`Array.isArray`を使用してください。

:::

値が配列かどうかを確認します。

```typescript
const result = isArray(value);
```

## 参照

### `isArray(value)`

値が配列かどうかを確認したい場合は`isArray`を使用してください。この関数はTypeScriptでタイプガードとしても使用できます。

```typescript
import { isArray } from 'es-toolkit/compat';

// 配列の確認
isArray([1, 2, 3]);
// Returns: true

isArray('abc');
// Returns: false

isArray(() => {});
// Returns: false

// オブジェクトとの区別
isArray({ 0: 'a', 1: 'b', length: 2 });
// Returns: false

isArray(null);
// Returns: false
```

#### パラメータ

- `value` (`unknown`): 配列かどうかを確認する値です。

#### 戻り値

(`value is any[]`): 値が配列の場合は`true`、そうでない場合は`false`を返します。
