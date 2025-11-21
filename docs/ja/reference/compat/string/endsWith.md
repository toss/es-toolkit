# endsWith (Lodash 互換性)

::: warning JavaScript の `String.prototype.endsWith` を使用してください

この `endsWith` 関数は、`null` や `undefined` の処理により、動作が遅くなります。

代わりに、より高速で現代的な JavaScript の `String.prototype.endsWith` を使用してください。

:::

文字列が指定された文字列で終わるかどうかを確認します。

```typescript
const result = endsWith(str, target);
```

## 使用法

### `endsWith(str, target, position?)`

文字列が特定の文字列で終わるかどうかを確認したい場合は `endsWith` を使用してください。検索する位置も指定できます。

```typescript
import { endsWith } from 'es-toolkit/compat';

// 文字列の終わりを確認
endsWith('fooBar', 'Bar');
// Returns: true

endsWith('fooBar', 'foo');
// Returns: false

// 特定の位置まで確認
endsWith('fooBar', 'foo', 3);
// Returns: true (最初の3文字'foo'が'foo'で終わるか確認)
```

`null` や `undefined` は `false` を返します。

```typescript
import { endsWith } from 'es-toolkit/compat';

endsWith(null, 'test');
// Returns: false

endsWith('test', null);
// Returns: false
```

#### パラメータ

- `str` (`string`,オプション): 確認する文字列です。
- `target` (`string`,オプション): 終わりにあるか探す文字列です。
- `position` (`number`,オプション): 検索を終了する位置です。デフォルトは文字列全体の長さです。

#### 戻り値

(`boolean`): 文字列が指定された文字列で終わる場合は `true`,そうでない場合は `false` を返します。
