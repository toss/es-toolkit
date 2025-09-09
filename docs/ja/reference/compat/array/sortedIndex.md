# sortedIndex

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

ソートされた配列から特定の値を挿入できる最下位インデックスを探し、配列のソート順を維持するようにします。

- 配列がソートされているとき、新しい値を適切な位置に挿入してソート順を維持します。
- この関数はバイナリ検索アルゴリズムを使用しているため、大規模な配列でも効率的に動作します。
- より複雑なソートロジックが必要な場合は、[sortedIndexBy](./sortedIndexBy.md)を使用して比較ロジックをカスタマイズすることができます。

この関数は、値を挿入する必要があるインデックスを返します。
値がすでに配列に存在する場合、返されるインデックスはその値の最初の位置の前になります。

## インターフェース

```typescript
function sortedIndex<T>(array: ArrayLike<T> | null | undefined, value: T): number;
```

### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 整列された配列。nullまたはundefinedの場合、空の配列とみなされます。
- `value` (`T`): 挿入位置を見つけるために評価する値。

### 戻り値

(`number`): 配列のソート順を維持するために値が挿入されるべきインデックス。

## 例

```typescript
import { sortedIndex } from 'es-toolkit/compat'；

// 数値配列で基本的な使い方
sortedIndex([10, 20, 30, 50], 40)；
// 戻り値: 3
// 説明: 40はソート順を維持するため3を返します。

// 空の配列やnull配列の処理
sortedIndex(null, 25)；
// 戻り値: 0
// 説明: nullまたは未定義の配列は空の配列とみなされ、0を返します。

// 基本的な比較ロジックを使う場合(sortedIndexByとの委任動作)
sortedIndex([10, '20', 30], 25)；
// 戻り値： 2
// 説明: デフォルトの比較ロジックを使用し、2 を返します。
```
