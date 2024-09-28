# ceil

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

数値を指定された桁数で切り上げる関数です。

## インターフェース

```typescript
function ceil(number: number | string, precision: number | string): number;
```

### パラメータ

- `number` (`number | string`): 切り上げる数値。
- `precision` (`number | string`): 切り上げる精度。

### 戻り値

(`number`): 切り上げられた数値。

## 例

```typescript
ceil(4.006); // => 5
ceil(6.004, 2); // => 6.01
ceil(6040, -2); // => 6100
```
