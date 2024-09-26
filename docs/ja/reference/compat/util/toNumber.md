# toNumber

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`value`を数値に変換します。

`Number()`とは異なり、この関数はシンボルに対して`NaN`を返します。

## インターフェース

```typescript
function toNumber(value?: unknown): number;
```

### パラメータ

- `value` (`unknown`): 変換する値。

### 戻り値

(`number`): 変換された数値。

## 例

```typescript
toNumber(3.2); // => 3.2
toNumber(Number.MIN_VALUE); // => 5e-324
toNumber(Infinity); // => Infinity
toNumber('3.2'); // => 3.2
toNumber(Symbol.iterator); // => NaN
toNumber(NaN); // => NaN
```