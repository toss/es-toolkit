# parseInt (Lodash 互換性)

::: warning `parseInt`を使用してください

この `parseInt` 関数は追加の関数呼び出しにより動作が遅くなります。

代わりに、より高速で現代的なネイティブ `parseInt` を使用してください。

:::

文字列を整数に変換します。

```typescript
const result = parseInt(string, radix);
```

## 使用法

### `parseInt(string, radix?)`

文字列を整数に変換したい場合は `parseInt` を使用してください。基数を指定して異なる進法として解釈できます。

```typescript
import { parseInt } from 'es-toolkit/compat';

// 基本的な10進数解析
parseInt('123');
// Returns: 123

parseInt('08');
// Returns: 8

// 16進数自動認識
parseInt('0x20');
// Returns: 32

// 明示的な基数指定
parseInt('08', 10);
// Returns: 8

parseInt('0x20', 16);
// Returns: 32

parseInt('1010', 2);
// Returns: 10

// 配列での使用
['6', '08', '10'].map(parseInt);
// Returns: [6, 8, 10]
```

不正な形式の文字列はNaNを返します。

```typescript
import { parseInt } from 'es-toolkit/compat';

parseInt('abc');
// Returns: NaN

parseInt('');
// Returns: NaN

parseInt('123abc');
// Returns: 123 (前の部分のみ解析)
```

#### パラメータ

- `string` (`string`): 整数に変換する文字列です。
- `radix` (`number`, オプション): 変換時に使用する基数です。デフォルトは `0` で、この場合文字列形式に応じて自動的に決定されます。

#### 戻り値

(`number`): 変換された整数を返します。変換できない場合はNaNを返します。
