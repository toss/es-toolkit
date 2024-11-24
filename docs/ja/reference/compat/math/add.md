# add

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

2つの数値を加算します。

## インターフェース

```typescript
function add(value: number, other: number): number;
```

### パラメータ

- `value` (`number`): 足し算する最初の数値です。
- `other` (`number`): 足し算する2番目の数値です。

### 戻り値

(`number`): 2つの数値の合計を返します。どちらか一方でもNaNの場合は、`NaN`を返します。

## 例

```typescript
const result1 = add(2, 3); // 2つの値はnumber型なので、result1は5になります。
const result2 = add(NaN, 5); // valueがNaNのため、result2はNaNになります。
const result3 = add(10, NaN); // otherがNaNのため、result3はNaNになります。
```
