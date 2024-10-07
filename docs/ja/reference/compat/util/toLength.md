# toLength

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

値を有効なインデックスに変換します。有効なインデックスとは、`0`以上`2^32 - 1`以下の整数を指します。

与えられた値を数値に変換し、整数に切り捨てます。値が0未満の場合は`0`を返し、値が`2^32 - 1`を超える場合は`2^32 - 1`を返します。

## インターフェース

```typescript
function toLength(value?: unknown): number;
```

### パラメータ

- `value` (`unknown`): 有効なインデックスに変換する値。

### 戻り値

(`number`): 変換された有効なインデックスの値。

## 例

```typescript
toLength(3.2)  // => 3
toLength(-1)   // => 0
toLength(1.9)  // => 1
toLength('42') // => 42
toLength(null) // => 0
```