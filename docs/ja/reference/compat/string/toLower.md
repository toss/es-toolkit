# toLower

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

与えられた値を文字列に変換し、小文字に変換します。与えられた入力は最初に文字列に変換されます。

## インターフェース

```typescript
function toLower(value?: unknown): string;
```

### パラメータ

- `value` (`unknown`): 変換する値。

### 戻り値

(`string`): 小文字に変換された文字列を返します。

## 例

```typescript
toLower('--FOO-BAR--');
// => '--foo-bar--'

toLower(null);
// => ''

toLower([1, 2, 3]);
// => '1,2,3'
```
