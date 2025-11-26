# isFinite (Lodash互換性)

::: warning `Number.isFinite`を使用してください

この`isFinite`関数は追加の型チェックオーバーヘッドにより動作が遅くなります。

代わりに、より速く現代的な`Number.isFinite`を使用してください。

:::

値が有限な数値かどうかを確認します。

```typescript
const result = isFinite(value);
```

## 使用法

### `isFinite(value)`

指定された値が有限な数値かどうかを確認したい場合は`isFinite`を使用してください。この関数はTypeScriptでタイプガードとしても動作し、値の型を`number`に絞り込みます。

```typescript
import { isFinite } from 'es-toolkit/compat';

// 有限な数値
isFinite(100); // true
isFinite(-50); // true
isFinite(3.14); // true
isFinite(0); // true

// 無限大はfalse
isFinite(Infinity); // false
isFinite(-Infinity); // false

// NaNもfalse
isFinite(NaN); // false

// 他の型もfalse
isFinite('100'); // false
isFinite([]); // false
isFinite({}); // false
isFinite(null); // false
isFinite(undefined); // false
```

#### パラメータ

- `value` (`any`): 確認する値です。

#### 戻り値

(`boolean`): 値が有限な数値の場合は`true`、そうでない場合は`false`を返します。  
`true`を返す場合、TypeScriptは`value`の型を`number`に絞り込みます。
