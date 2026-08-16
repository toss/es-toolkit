# toNumber (Lodash 互換性)

::: warning Numberコンストラクタを使用してください

この`toNumber`関数はシンボル型検証と追加処理により遅く動作します。

代わりにより高速で現代的なNumberコンストラクタを使用してください。

:::

値を数値に変換します。

```typescript
const number = toNumber(value);
```

## 使用法

### `toNumber(value)`

値を数値に変換します。シンボルはNaNとして処理します。

```typescript
import { toNumber } from 'es-toolkit/compat';

// 通常の数値はそのまま返す
toNumber(3.2);
// Returns: 3.2

// 文字列数値を変換
toNumber('3.2');
// Returns: 3.2

// 無限大もそのまま返す
toNumber(Infinity);
// Returns: Infinity

// 非常に小さい数もそのまま返す
toNumber(Number.MIN_VALUE);
// Returns: 5e-324
```

シンボルとNaNはNaNに変換します。

```typescript
import { toNumber } from 'es-toolkit/compat';

toNumber(Symbol.iterator);
// Returns: NaN

toNumber(NaN);
// Returns: NaN
```

#### パラメータ

- `value` (`unknown`): 変換する値です。

#### 戻り値

(`number`): 変換された数値を返します。
