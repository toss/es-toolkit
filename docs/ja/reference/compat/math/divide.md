# divide

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

2つの数を割ります。

どちらかの数字が「NaN」の場合、関数は「NaN」を返します。

## インターフェース

```typescript
function divide(value: number, other: number): number;
```

### パラメータ

- `value` (`number`): 除算の最初の数。
- `other` (`number`): 除算の2番目の数。

### 戻り値

(`number`): 値と他の商。

## 例

```typescript
divide(6, 3); // => 2
divide(2, NaN); // => NaN
divide(NaN, 3); // => NaN
divide(NaN, NaN); // => NaN
```
