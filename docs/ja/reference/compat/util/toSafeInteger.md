# toSafeInteger

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`value` を安全な整数に変換します。値が無限の場合、最大または最小の安全な整数に変換されます。小数点は値を切り捨てて削除されます。

## インターフェース

```typescript
function toSafeInteger(value?: unknown): number;
```

### パラメータ

- `value` (`unknown`): 変換する値。

### 戻り値

(`number`): 変換された安全な整数。

## 例

```typescript
toSafeInteger(3.2); // => 3
toSafeInteger(Number.MAX_VALUE); // => 9007199254740991
toSafeInteger(Infinity); // => 9007199254740991
toSafeInteger('3.2'); // => 3
toSafeInteger(NaN); // => 0
toSafeInteger(null); // => 0
toSafeInteger(-Infinity); // => -9007199254740991
```
