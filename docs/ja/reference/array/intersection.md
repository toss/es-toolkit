# intersection

両方の配列に含まれる要素を返します。

この関数は2つの配列を受け取り、両方の配列に含まれる要素で構成された新しい配列を返します。
実際には、最初の配列の要素のうち、2番目の配列に含まれていない要素を削除します。

## インターフェース

```typescript
function intersection<T>(firstArr: T[], secondArr: T[]): T[];
```

### パラメータ

- `firstArr` (`T[]`): 比較する1つ目の配列。
- `secondArr` (`T[]`): 比較する2つ目の配列。

### 戻り値

(`T[]`) 両方の配列に含まれる要素で構成された新しい配列。

## 例

```typescript
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const result = intersection(array1, array2);
// 両方の配列に含まれる [3, 4, 5] を返します。
```

## Lodashとの互換性

`es-toolkit/compat`から`intersection`をインポートすると、lodashと互換性があります。

- `intersection`は公通要素を見つけるために複数の配列風オブジェクト(Array-like object)を受け入れます。
- `intersection`はユニークな要素のみを返します。

```typescript
import { intersection } from 'es-toolkit/compat';

const array1 = [1, 2, 3, 4, 4, 5];
const array2 = [2, 4];
const array3 = [4, 6];
const result = intersection(array1, array2, array3);
// 結果は [4] です。この唯一の要素はすべての配列に存在します。

const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 3, length: 2 };
const result2 = intersection(arrayLike1, arrayLike2);
// 結果2は [2, 3] です。これらの要素は両方の配列のようなオブジェクトに存在します。
```
