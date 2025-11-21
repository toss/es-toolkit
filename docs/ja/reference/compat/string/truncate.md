# truncate (Lodash 互換性)

::: warning JavaScript の `String.prototype.slice` を使用してください

この `truncate` 関数は、複雑な Unicode 処理と正規表現チェックにより動作が遅くなります。

代わりに、より高速でモダンな JavaScript の `String.prototype.slice` を使用してください。

:::

文字列が指定された最大長より長い場合、切り詰めて省略文字列を追加します。

```typescript
const truncated = truncate(str, options);
```

## 使用法

### `truncate(string, options?)`

長い文字列を指定された長さに切り詰めたい場合は `truncate` を使用します。切り詰められた部分は省略文字列(デフォルト: `"..."`)に置き換えられます。

```typescript
import { truncate } from 'es-toolkit/compat';

// 基本的な使用法 (最大30文字)
truncate('hi-diddly-ho there, neighborino');
// 戻り値: 'hi-diddly-ho there, neighbo...'

// 長さを指定
truncate('hi-diddly-ho there, neighborino', { length: 24 });
// 戻り値: 'hi-diddly-ho there, n...'

// 省略文字列を変更
truncate('hi-diddly-ho there, neighborino', { omission: ' [...]' });
// 戻り値: 'hi-diddly-ho there, neig [...]'
```

セパレーターを指定すると、その位置で切り詰めることができます。

```typescript
import { truncate } from 'es-toolkit/compat';

// 空白セパレーターで単語境界で切り詰め
truncate('hi-diddly-ho there, neighborino', {
  length: 24,
  separator: ' ',
});
// 戻り値: 'hi-diddly-ho there,...'

// 正規表現でセパレーターを指定
truncate('hi-diddly-ho there, neighborino', {
  length: 24,
  separator: /,? +/,
});
// 戻り値: 'hi-diddly-ho there...'
```

Unicode 文字も正しく処理されます。

```typescript
import { truncate } from 'es-toolkit/compat';

truncate('¥§✈✉🤓', { length: 5 });
// 戻り値: '¥§✈✉🤓'

truncate('¥§✈✉🤓', { length: 4, omission: '…' });
// 戻り値: '¥§✈…'
```

#### パラメータ

- `string` (`string`, オプション): 切り詰める文字列。
- `options` (`object`, オプション): オプションオブジェクト。
  - `options.length` (`number`, オプション): 最大文字列長。デフォルトは `30`。
  - `options.omission` (`string`, オプション): テキストが省略されたことを示す文字列。デフォルトは `'...'`。
  - `options.separator` (`RegExp | string`, オプション): 切り詰める位置を決定するセパレーターパターン。

#### 戻り値

(`string`): 切り詰められた文字列を返します。
