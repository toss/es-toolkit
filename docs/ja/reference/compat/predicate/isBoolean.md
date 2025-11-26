# isBoolean (Lodash互換性)

::: warning `typeof`演算子を使用してください
この`isBoolean`関数はBooleanオブジェクトラッパーの処理により複雑になります。

代わりに、よりシンプルで現代的な`typeof value === 'boolean'`を使用してください。
:::

値がboolean型かどうかを確認します。

```typescript
const result = isBoolean(value);
```

## 使用法

### `isBoolean(value)`

値がboolean型かどうかを型安全に確認したい場合は`isBoolean`を使用してください。プリミティブのboolean値とBooleanオブジェクトラッパーの両方を確認します。TypeScriptでタイプガードとしても動作します。

```typescript
import { isBoolean } from 'es-toolkit/compat';

// プリミティブboolean値
isBoolean(true); // true
isBoolean(false); // true

// Booleanオブジェクトラッパー
isBoolean(new Boolean(true)); // true
isBoolean(new Boolean(false)); // true

// 他の型はfalse
isBoolean(0); // false
isBoolean(1); // false
isBoolean('true'); // false
isBoolean('false'); // false
isBoolean(null); // false
isBoolean(undefined); // false
isBoolean({}); // false
isBoolean([]); // false
```

#### パラメータ

- `value` (`unknown`): boolean型かどうかを確認する値です。

#### 戻り値

(`value is boolean`): 値がboolean型の場合は`true`、そうでない場合は`false`を返します。
