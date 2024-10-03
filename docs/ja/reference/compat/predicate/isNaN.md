# isNaN

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

値が`NaN`かどうかを確認します。

## インターフェース

```typescript
function isNaN(value: unknown): value is typeof NaN;
```

### パラメータ

- `value` (`unknown`): 確認する値。

### 戻り値

(`value is typeof NaN`): 値がNaNの場合は`true`、それ以外の場合は`false`。
数値配列。

## 例

```typescript
isNaN(NaN); // true
isNaN(0); // false
isNaN('NaN'); // false
isNaN(undefined); // false
```
