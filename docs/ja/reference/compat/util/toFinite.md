# toFinite (Lodash 互換性)

値を有限な数値に変換します。

```typescript
const finite = toFinite(value);
```

## 参照

### `toFinite(value)`

値を有限な数値に変換します。無限大はNumber.MAX_VALUEに、NaNは0に処理します。

```typescript
import { toFinite } from 'es-toolkit/compat';

// 通常の数値はそのまま返す
toFinite(3.2);
// Returns: 3.2

// 無限大はMAX_VALUEに変換
toFinite(Infinity);
// Returns: 1.7976931348623157e+308

toFinite(-Infinity);
// Returns: -1.7976931348623157e+308

// 文字列数値は数値に変換
toFinite('3.2');
// Returns: 3.2
```

無効な値は0に変換します。

```typescript
import { toFinite } from 'es-toolkit/compat';

toFinite(NaN);
// Returns: 0

toFinite(Symbol.iterator);
// Returns: 0

toFinite(null);
// Returns: 0
```

#### パラメータ

- `value` (`unknown`): 変換する値です。

#### 戻り値

(`number`): 変換された有限な数値を返します。
