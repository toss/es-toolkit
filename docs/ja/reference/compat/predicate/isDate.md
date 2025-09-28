# isDate (Lodash互換性)

::: warning es-toolkitの[isDate](../../predicate/isDate.md)を使用してください
この`isDate`関数はLodash互換性のための複雑な処理により動作が遅くなります。

代わりに、より速く現代的な`es-toolkit`の[isDate](../../predicate/isDate.md)を使用してください。
:::

値がDateオブジェクトかどうかを確認します。

```typescript
const result = isDate(value);
```

## 参照

### `isDate(value)`

値がDateオブジェクトかどうかを型安全に確認したい場合は`isDate`を使用してください。TypeScriptでタイプガードとしても動作します。

```typescript
import { isDate } from 'es-toolkit/compat';

// Dateオブジェクトの確認
const date = new Date();
isDate(date); // true

// 無効なDateもDateオブジェクトとして認識します
const invalidDate = new Date('invalid');
isDate(invalidDate); // true

// 他の型はfalse
isDate('2024-01-01'); // false
isDate(1640995200000); // false
isDate({}); // false
isDate(null); // false
isDate(undefined); // false
```

#### パラメータ

- `value` (`unknown`): Dateオブジェクトかどうかを確認する値です。

#### 戻り値

(`value is Date`): 値がDateオブジェクトの場合は`true`、そうでない場合は`false`を返します。
