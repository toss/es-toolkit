# toString (Lodash 互換性)

::: warning Stringコンストラクタを使用してください

この`toString`関数は複雑な配列処理と-0特殊ケース処理により遅く動作します。

代わりにより高速で現代的なString(value)を使用してください。

:::

値を文字列に変換します。

```typescript
const str = toString(value);
```

## 使用法

### `toString(value)`

値を文字列に変換します。nullとundefinedは空の文字列に、-0の符号は保存します。

```typescript
import { toString } from 'es-toolkit/compat';

// 基本型
toString(null);
// Returns: ''

toString(undefined);
// Returns: ''

toString('hello');
// Returns: 'hello'

toString(123);
// Returns: '123'

// -0の符号保存
toString(-0);
// Returns: '-0'
```

配列は再帰的に変換します。

```typescript
import { toString } from 'es-toolkit/compat';

// 配列を文字列に変換
toString([1, 2, 3]);
// Returns: '1,2,3'

// ネストした配列
toString([1, [2, 3], 4]);
// Returns: '1,2,3,4'

// -0を含む配列
toString([1, 2, -0]);
// Returns: '1,2,-0'

// シンボルを含む配列
toString([Symbol('a'), Symbol('b')]);
// Returns: 'Symbol(a),Symbol(b)'
```

#### パラメータ

- `value` (`any`): 変換する値です。

#### 戻り値

(`string`): 変換された文字列を返します。nullとundefinedは空の文字列を返します。
