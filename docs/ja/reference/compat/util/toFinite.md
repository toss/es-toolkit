# toFinite

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`value` を有限の数値に変換します。

## インターフェース

```typescript
function toFinite(value?: unknown): number;
```

### パラメータ

- `value` (`unknown`): 変換する値。

### 戻り値

(`number`): 有限の数値。

## 例

```typescript
toNumber(3.2); // => 3.2
toNumber(Number.MIN_VALUE); // => 5e-324
toNumber(Infinity); // => 1.7976931348623157e+308
toNumber('3.2'); // => 3.2
toNumber(Symbol.iterator); // => 0
toNumber(NaN); // => 0
```