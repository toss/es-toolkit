# sortedIndexBy

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

ソートされた配列から特定の値を挿入できる最下位インデックスを探し、配列のソート順を維持するようにします。
[sortedIndex](./sortedIndex.md)とは異なり、この関数は比較に使用する値を抽出するためにカスタムiteratee関数を指定することができます。

- iteratee関数は、配列の各要素と挿入する値に対して呼び出されます。
- オブジェクトやユーザー定義のデータ型を含む配列で、特定の属性や計算された値に基づいて並べ替えを行いたいときに便利です。

## インターフェース

```typescript
function sortedIndexBy<T, R>(
  array: ArrayLike<T> | null | undefined,
  value: T,
  iteratee: (value: T) => R,
  retHighest?: boolean
): number;
```

### パラメータ

- `array` (`ArrayLike<T> | null | undefined`): 整列された配列。nullまたはundefinedの場合、空の配列とみなされます。
- `value` (`T`): 挿入位置を見つけるために評価する値。
- `iteratee` (`(item: T) => R`): 配列の要素と挿入する値を変換する関数。この関数の戻り値を基準にソート順を決定します。
- `retHighest` (`boolean, オプション`): 配列に同じ値が存在する場合、最後の位置を返す場合はtrueに設定します。 (デフォルト: false)。

### 戻り値

(`number`): ソート順を維持するために値を挿入するインデックスです。

## 例

```typescript
import { sortedIndexBy } from 'es-toolkit/compat'；

const objects = [{ x: 10 }, { x: 20 }, { x: 30 }]；

// 比較のため `x` 属性を抽出する iteratee を使います。
sortedIndexBy(objects, { x: 25 }, o => o.x)；
// 戻り値： 2
// 説明: `x` 属性を基準にして `{ x： 25 }` はインデックス 2 を返します。

// ユーザー定義のソートロジック処理
const strings = ['apple', 'banana', 'cherry']；
sortedIndexBy(strings, 'apricot', str => str.length)；
// 戻り値: 1
// 説明: 文字列の長さを基準に'apricot'はインデックス1を返します。
```
