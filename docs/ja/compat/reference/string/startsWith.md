# startsWith (Lodash 互換性)

::: warning JavaScript の `String.prototype.startsWith` を使用してください

この `startsWith` 関数は `null` や `undefined` の処理により動作が遅くなります。

より高速で現代的な JavaScript の `String.prototype.startsWith` を使用してください。

:::

文字列が指定された文字列で始まるかどうかを確認します。

```typescript
const result = startsWith(str, target);
```

## 使用法

### `startsWith(str, target, position?)`

文字列が特定の文字列で始まるかどうかを確認したい場合は `startsWith` を使用してください。検索を開始する位置も指定できます。

```typescript
import { startsWith } from 'es-toolkit/compat';

// 文字列の開始を確認
startsWith('fooBar', 'foo');
// 戻り値: true

startsWith('fooBar', 'bar');
// 戻り値: false

// 特定の位置から確認
startsWith('fooBar', 'Bar', 3);
// 戻り値: true (3番目の位置から 'Bar' で始まるかどうかを確認)
```

`null` や `undefined` は `false` を返します。

```typescript
import { startsWith } from 'es-toolkit/compat';

startsWith(null, 'test');
// 戻り値: false

startsWith('test', null);
// 戻り値: false
```

#### パラメータ

- `str` (`string`, オプション): 確認する文字列です。
- `target` (`string`, オプション): 先頭にあるかどうかを探す文字列です。
- `position` (`number`, オプション): 検索を開始する位置です。デフォルトは `0` です。

#### 戻り値

(`boolean`): 文字列が指定された文字列で始まる場合は `true`、そうでない場合は `false` を返します。
