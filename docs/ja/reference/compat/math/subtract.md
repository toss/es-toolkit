# subtract

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

二つの数字の差を返す関数です。

どちらかが `NaN` の場合 `NaN` を返します。

## インターフェース

```typescript
function subtract(value: number, other: number): number;
```

### パラメータ

- `value` (`number`): 基準となる数字です。
- `other` (`number`): `value` から引く数字です。

### 戻り値

(`number`): `value` から `other` を引いた値を返します。どちらかが `NaN` の場合、`NaN`を返します。

## 例

```typescript
subtract(6, 4); // 2を返します。
subtract(-6, 4); // -10を返します。
subtract(NaN, 4); // valueがNaNのためNaNを返します。
subtract(6, NaN); // otherがNaNのためNaNを返します。
subtract(NaN, NaN); // 両方の引数がNaNのためNaNを返します。
```
