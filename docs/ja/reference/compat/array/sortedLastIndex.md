# sortedLastIndex

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。これは、代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

配列をソート順に保つために、指定された値を挿入すべき最も高いインデックスを二分探索で決定します。

## インターフェース

```typescript
function sortedLastIndex<T>(array: ArrayLike<T> | null | undefined, value: T): number;
```

### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 検査対象のソート済み配列。
- `value` (`T`): 評価する値。

### 戻り値

(`number`): 配列に値を挿入すべきインデックス。

## 例

```typescript
sortedLastIndex([4, 5, 5, 5, 6], 5);
// => 4
```
