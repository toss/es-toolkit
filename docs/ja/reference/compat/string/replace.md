# replace (Lodash 互換性)

::: warning JavaScript の `String.prototype.replace` を使用してください

この `replace` 関数は、文字列以外の値の処理により、動作が遅くなります。

代わりに、より高速で現代的な JavaScript の `String.prototype.replace` を使用してください。

:::

文字列内の一致するパターンを他の文字列に置き換えます。

```typescript
const replaced = replace(target, pattern, replacement);
```

## 参照

### `replace(target, pattern, replacement)`

文字列内の特定のパターンを見つけて他の文字列に置き換えたい場合は `replace` を使用してください。文字列または正規表現パターンを使用でき、置換内容は文字列または関数で指定できます。

```typescript
import { replace } from 'es-toolkit/compat';

// 文字列パターンで置換
replace('abcde', 'de', '123');
// Returns: 'abc123'

// 正規表現パターンで置換
replace('abcde', /[bd]/g, '-');
// Returns: 'a-c-e'
```

関数を使用して動的に置換内容を決定することもできます。

```typescript
import { replace } from 'es-toolkit/compat';

// 関数で置換内容を決定
replace('abcde', 'de', match => match.toUpperCase());
// Returns: 'abcDE'

// 正規表現と関数の組み合わせ
replace('abcde', /[bd]/g, match => match.toUpperCase());
// Returns: 'aBcDe'
```

`null` や `undefined` の対象は空文字列として処理されます。

```typescript
import { replace } from 'es-toolkit/compat';

replace(null, 'test', 'replaced');
// Returns: ''

replace(undefined, /test/g, 'replaced');
// Returns: ''
```

#### パラメータ

- `target` (`string`): 置換する対象の文字列です。
- `pattern` (`string | RegExp`): 探すパターンです。
- `replacement` (`string | Function`): 置換内容です。関数の場合、マッチした文字列を受け取って置換文字列を返す必要があります。

#### 戻り値

(`string`): パターンが置き換えられた新しい文字列を返します。
