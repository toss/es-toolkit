# sortedLastIndexBy

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。これは、代替可能なネイティブ JavaScript API が存在するか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

`sortedLastIndex` と同様ですが、`value` と配列の各要素のソート順位を計算するために `iteratee` を受け入れます。`iteratee` は1つの引数（value）で呼び出されます。

## インターフェース

```typescript
function sortedLastIndexBy<T, R>(array: ArrayLike<T> | null | undefined, value: T, iteratee?: Iteratee<T, R>): number;
```

### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 検査対象のソート済み配列。
- `value` (`T`): 評価する値。
- `iteratee` (`(value: T) => R | PropertyName | [PropertyName, any] | Partial<T>`): 各要素に対して呼び出される`iteratee`。

### 戻り値

(`number`): 配列に値を挿入すべき最も高いインデックス。

## 例

```typescript
const objects = [{ n: 4 }, { n: 5 }];
sortedLastIndexBy(objects, { n: 4 }, ({ n }) => n);
// => 1
```
