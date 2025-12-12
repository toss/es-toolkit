# toLower (Lodash 互換性)

::: warning JavaScriptの `String.prototype.toLowerCase` を使用してください

この `toLower` 関数は、文字列以外の値の処理により動作が遅くなります。

代わりに、より高速で現代的なJavaScriptの `String.prototype.toLowerCase` を使用してください。

:::

値を文字列に変換した後、小文字に変換します。

```typescript
const lowercased = toLower(value);
```

## 使用法

### `toLower(value?)`

値を小文字の文字列に変換したい場合は `toLower` を使用してください。任意の型の値をまず文字列に変換してから小文字にします。

```typescript
import { toLower } from 'es-toolkit/compat';

// 文字列を小文字に変換
toLower('--FOO-BAR--');
// Returns: '--foo-bar--'

toLower('Hello World');
// Returns: 'hello world'

// 数値を変換
toLower(123);
// Returns: '123'

// 配列を変換
toLower([1, 2, 3]);
// Returns: '1,2,3'
```

`null` または `undefined` は空文字列として扱われます。

```typescript
import { toLower } from 'es-toolkit/compat';

toLower(null);
// Returns: ''

toLower(undefined);
// Returns: ''

toLower();
// Returns: ''
```

#### パラメータ

- `value` (`unknown`, オプション): 小文字に変換する値です。

#### 戻り値

(`string`): 小文字に変換された文字列を返します。
