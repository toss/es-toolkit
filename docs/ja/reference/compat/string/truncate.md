# truncate

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

文字列が指定された最大長を超える場合、文字列を切り取ります。切り取られた文字列の最後の部分は省略を示す文字列に置き換えられます。省略を示す文字列のデフォルト値は `"..."` です。

## インターフェース

```typescript
function truncate(
  string: string,
  options?: {
    length?: number;
    separator?: string | RegExp;
    omission?: string;
  }
): string;
```

### パラメーター

- `string` (`string`): 切り取る文字列。
- `options` (`Object`, オプション): オプションオブジェクト。
  - `length` (`number`, オプション): 最大文字列長。デフォルトは `30`。
  - `omission` (`string`, オプション): テキストが省略されたことを示す文字列。デフォルトは `'...'`。
  - `separator` (`RegExp|string`, オプション): 切り取る位置を決定する区切りパターン。

### 戻り値

(`string`): 切り取られた文字列。

## 例

```typescript
const test = 'hi-diddly-ho there, neighborino';

truncate(test);
// => 'hi-diddly-ho there, neighbo...'

truncate(test, { length: 24, separator: ' ' });
// => 'hi-diddly-ho there,...'

truncate(test, { length: 24, separator: /,? +/ });
// => 'hi-diddly-ho there...'

truncate(test, { omission: ' [...]' });
// => 'hi-diddly-ho there, neig [...]'

truncate('ABC', { length: 3 });
// => 'ABC'

truncate('ABC', { length: 2 });
// => '...'

truncate('¥§✈✉🤓', { length: 5 });
// => '¥§✈✉🤓'

truncate('¥§✈✉🤓', { length: 4, omission: '…' });
// => '¥§✈…'
```
