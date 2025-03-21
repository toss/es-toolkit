# uniqWith

::: info
この関数は互換性のために `es-toolkit/compat` からのみインポートできます。代替可能なネイティブ JavaScript API があるか、まだ十分に最適化されていないためです。

`es-toolkit/compat` からこの関数をインポートすると、[lodash と完全に同じように動作](../../../compatibility.md)します。
:::

このメソッドは「uniq」のようですが、要素の等価性を判断するために使われる「comparator」を受け入れます。

配列の重複のないバージョンを作成し、それぞれの要素が最初に現れたものだけを保持します。
「comparator」が提供されている場合、比較する要素として「(arrVal, othVal)」の 2 つの引数で呼び出されます。
「comparator」が提供されていない場合、浅い等価性が使用されます。

結果の値の順序は、入力配列に現れる順序によって決まります。

## インターフェース

```typescript
function uniqWith<T>(arr: ArrayLike<T> | null | undefined, comparator?: Comparator<T>): T[];
```

### パラメータ

- `arr` (`ArrayLike<T> | null | undefined`): 処理する配列。
- `comparator` (`Comparator<T>`): 要素の等価性を比較するためのオプションの関数。

### 戻り値

(`T[]`): comparator に基づいてユニークな値のみを含む新しい配列。

## 例

```typescript
const array = [1, 2, 2, 3];
const result = uniqWith(array);
// result will be [1, 2, 3]

const array = [1, 2, 3];
const result = uniqWith(array, (a, b) => a % 2 === b % 2)
// result will be [1, 2]
```