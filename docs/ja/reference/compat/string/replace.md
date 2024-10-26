# replace

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

文字列内の一致するパターンを別の文字列に置き換えます。

## インターフェース

```typescript
function replace(
  target: string,
  pattern: string | RegExp,
  replacement: string | ((substring: string, ...args: any[]) => string)
): string;
```

### パラメータ

- `target` (`string`): 対象の文字列。
- `pattern` (`string | RegExp`): 一致させるパターン。
- `replacement` (`string | ((substring: string, ...args: any[]) => string)`): 置換文字列または置換文字列を返す関数。

### 戻り値

(`string`): 一致したパターンが置き換えられた新しい文字列。

## 例

```typescript
replace('abcde', 'de', '123'); // 'abc123'
replace('abcde', /[bd]/g, '-'); // 'a-c-e'
replace('abcde', 'de', substring => substring.toUpperCase()); // 'abcDE'
replace('abcde', /[bd]/g, substring => substring.toUpperCase()); // 'aBcDe'
```
