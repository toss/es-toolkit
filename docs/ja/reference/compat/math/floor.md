# floor

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

数値を指定された桁数で切り捨てます。

## インターフェース

```typescript
function floor(number: number | string, precision: number | string): number;
```

### パラメータ

- `number` (`number | string`): 切り捨てたい数値。
- `precision` (`number | string`): 切り捨てたい精度。

### 戻り値

(`number`): 切り捨てられた数値。

## 例

```typescript
floor(4.006); // => 4
floor(0.046, 2); // => 0.04
floor(4060, -2); // => 4000
```
