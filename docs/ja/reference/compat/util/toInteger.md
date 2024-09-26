# toInteger

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`value`を整数に変換します。無限大の値の場合は、有限の値に変換されます。小数点以下の数字は切り捨てられます。

## インターフェース

```typescript
function toInteger(value?: unknown): number;
```

### パラメータ

- `value` (`unknown`): 変換する値。

### 戻り値

(`number`): 整数。

## 例

```typescript
toInteger(3.2); // => 3
toInteger(Number.MIN_VALUE); // => 0
toInteger(Infinity); // => 1.7976931348623157e+308
toInteger('3.2'); // => 3
toInteger(Symbol.iterator); // => 0
toInteger(NaN); // => 0
```