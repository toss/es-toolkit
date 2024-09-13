# parseInt

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

文字列を整数に変換します。基数を `radix` パラメータで定義できます。

基数 `radix` が未定義または0の場合、与えられた文字列の形式に応じて異なる基数が使用されます。文字列が `0x20` のように16進数の場合、基数は16が使用されます。それ以外の場合、基数は10が使用されます。

## インターフェース

```typescript
function parseInt(string: string, radix: number, guard?: unknown): number;
```

### パラメータ

- `string` (`string`): 整数に変換する文字列。
- `radix` (`number`): 文字列を整数に変換する際に使用する基数。デフォルトは`0`です。
- `guard` (`unknown`): `Array#map`のようなメソッドでイテレートとして使用可能にします。

### 戻り値

(`number`): 変換された整数を返しますます。

## 例

```typescript
parseInt('08'); // => 8
parseInt('0x20'); // => 32

parseInt('08', 10); // => 8
parseInt('0x20', 16); // => 32

['6', '08', '10'].map(parseInt); // => [6, 8, 10]
```
