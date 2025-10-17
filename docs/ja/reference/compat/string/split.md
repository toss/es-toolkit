# split (Lodash 互換性)

::: warning JavaScriptの`String.prototype.split`を使用してください

この`split`関数は、`null`または`undefined`の処理により動作が遅くなります。

代わりに、より高速で現代的なJavaScriptの`String.prototype.split`を使用してください。

:::

区切り文字を使用して文字列を配列に分割します。

```typescript
const segments = split(str, separator);
```

## 参照

### `split(string, separator?, limit?)`

特定の区切り文字を使用して文字列を配列に分割したい場合は、`split`を使用してください。結果配列の最大長を制限することもできます。

```typescript
import { split } from 'es-toolkit/compat';

// ハイフンで分割
split('a-b-c', '-');
// 戻り値: ['a', 'b', 'c']

// 結果の数を制限
split('a-b-c-d', '-', 2);
// 戻り値: ['a', 'b']

// 正規表現で分割
split('hello world', /\s/);
// 戻り値: ['hello', 'world']
```

区切り文字を指定しない場合、文字列全体が配列の最初の要素になります。

```typescript
import { split } from 'es-toolkit/compat';

split('hello');
// 戻り値: ['hello']
```

`null`または`undefined`は空文字列として扱われます。

```typescript
import { split } from 'es-toolkit/compat';

split(null);
// 戻り値: ['']

split(undefined);
// 戻り値: ['']
```

#### パラメータ

- `string` (`string`, オプション): 分割する文字列です。デフォルトは空文字列です。
- `separator` (`RegExp | string`, オプション): 分割の基準となる区切り文字です。
- `limit` (`number`, オプション): 結果配列の最大長です。

#### 戻り値

(`string[]`): 区切り文字で分割された文字列配列を返します。
