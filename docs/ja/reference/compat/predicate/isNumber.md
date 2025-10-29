# isNumber (Lodash 互換性)

::: warning `typeof` 演算子を使用してください

この `isNumber` 関数はNumber オブジェクトラッパーの処理により複雑です。

代わりにより簡単で現代的な `typeof value === 'number'` を使用してください。

:::

値が数値かどうかを確認します。

```typescript
const result = isNumber(value);
```

## 参照

### `isNumber(value)`

値が数値かどうかを確認したい場合に `isNumber` を使用してください。この関数はプリミティブ数値とNumberオブジェクトの両方を数値として認識します。

```typescript
import { isNumber } from 'es-toolkit/compat';

// プリミティブ数値
isNumber(123);
// Returns: true

isNumber(3.14);
// Returns: true

isNumber(NaN);
// Returns: true

// Number オブジェクト
isNumber(new Number(42));
// Returns: true

// その他の型
isNumber('123');
// Returns: false

isNumber(true);
// Returns: false

isNumber(null);
// Returns: false
```

#### パラメータ

- `value` (`unknown`): 数値かどうかを確認する値です。

#### 戻り値

(`value is number`): 値が数値の場合は `true`、そうでなければ `false` を返します。
