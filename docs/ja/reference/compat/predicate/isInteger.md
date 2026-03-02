# isInteger (Lodash互換性)

::: warning `Number.isInteger`を使用してください

この`isInteger`関数は追加の型チェックオーバーヘッドにより動作が遅くなります。

代わりに、より速く現代的な`Number.isInteger`を使用してください。

:::

値が整数かどうかを確認します。

```typescript
const result = isInteger(value);
```

## 使用法

### `isInteger(value)`

指定された値が整数かどうかを確認したい場合は`isInteger`を使用してください。この関数はTypeScriptでタイプガードとしても動作し、値の型を`number`に絞り込みます。

```typescript
import { isInteger } from 'es-toolkit/compat';

// 整数値の確認
isInteger(3); // true
isInteger(-5); // true
isInteger(0); // true

// 小数値はfalse
isInteger(3.14); // false
isInteger(-2.5); // false

// 無限大はfalse
isInteger(Infinity); // false
isInteger(-Infinity); // false

// 他の型もfalse
isInteger('3'); // false
isInteger([]); // false
isInteger({}); // false
```

#### パラメータ

- `value` (`any`): 確認する値です。

#### 戻り値

(`boolean`): 値が整数の場合は`true`、そうでない場合は`false`を返します。
