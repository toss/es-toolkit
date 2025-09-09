# multiply

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

2つの数値を掛け算します。

どちらかの値が `NaN` の場合、`NaN` を返します。

## インターフェース

```typescript
function multiply(value: number, other: number): number;
```

### パラメータ

- `value` (`number`): 掛け算の最初の数値。
- `other` (`number`): 掛け算の2番目の数値。

### 戻り値

(`number`): `value` と `other` の積を返します。どちらかのパラメータが `NaN` の場合は、`NaN` を返します。

## 例

```typescript
multiply(2, 3); // 6を返します。
multiply(2, -3); // -6を返します。
multiply(NaN, 3); // valueがNaNなのでNaNを返します。
multiply(2, NaN); // otherがNaNなのでNaNを返します。
multiply(NaN, NaN); // 両方の引数がNaNなのでNaNを返します。
```
