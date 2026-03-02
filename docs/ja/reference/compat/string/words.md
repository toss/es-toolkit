# words (Lodash 互換性)

::: warning `es-toolkit` の `words` を使用してください

この `words` 関数は、`null` や `undefined` の処理、複雑な Unicode サポートなどにより動作が遅くなります。

代わりに、より高速でモダンな `es-toolkit` の [words](../../string/words.md) を使用してください。

:::

文字列を単語の配列に分割します。

```typescript
const wordArray = words(str, pattern);
```

## 使用法

### `words(str, pattern)`

文字列を単語単位で分割したい場合は `words` を使用します。デフォルトでは、英字、数字、絵文字などを認識して単語を抽出します。

```typescript
import { words } from 'es-toolkit/compat';

// 基本的な単語抽出
words('fred, barney, & pebbles');
// 戻り値: ['fred', 'barney', 'pebbles']

// キャメルケースから単語を抽出
words('camelCaseWord');
// 戻り値: ['camel', 'Case', 'Word']

// 数字を含む文字列
words('hello123world');
// 戻り値: ['hello', '123', 'world']
```

カスタムパターンを使用して単語を抽出することもできます。

```typescript
import { words } from 'es-toolkit/compat';

// 正規表現を使用した単語抽出
words('hello world', /\w+/g);
// 戻り値: ['hello', 'world']

// 文字列パターンを使用
words('one-two-three', '-');
// 戻り値: ['-']
```

`null` または `undefined` は空の配列として扱われます。

```typescript
import { words } from 'es-toolkit/compat';

words(null); // []
words(undefined); // []
```

#### パラメータ

- `str` (`string`, オプション): 単語に分割する文字列。
- `pattern` (`RegExp | string`, オプション): 単語にマッチするパターン。デフォルトは組み込みの Unicode 単語パターン。

#### 戻り値

(`string[]`): 抽出された単語の配列を返します。
