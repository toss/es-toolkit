# toInteger (Lodash 互換性)

値を整数に変換します。

```typescript
const integer = toInteger(value);
```

## 参照

### `toInteger(value)`

値を整数に変換します。小数部分は切り捨てて整数のみ残します。

```typescript
import { toInteger } from 'es-toolkit/compat';

// 小数を整数に変換
toInteger(3.2);
// Returns: 3

// 文字列数値を整数に変換
toInteger('3.2');
// Returns: 3

// 非常に小さい数は0になる
toInteger(Number.MIN_VALUE);
// Returns: 0

// 無限大はMAX_VALUEになる
toInteger(Infinity);
// Returns: 1.7976931348623157e+308
```

無効な値は0に変換します。

```typescript
import { toInteger } from 'es-toolkit/compat';

toInteger(NaN);
// Returns: 0

toInteger(Symbol.iterator);
// Returns: 0

toInteger(null);
// Returns: 0
```

#### パラメータ

- `value` (`unknown`): 変換する値です。

#### 戻り値

(`number`): 変換された整数を返します。
