# product

複数の配列の[デカルト積](https://en.wikipedia.org/wiki/Cartesian_product)を計算します。

```typescript
const tuples = product(arr1, arr2);
```

## インターフェース

### `product(...arrs)`

各配列から1つずつ要素を選んで作れるすべての組み合わせが必要なときに `product` を使用してください。タプルは辞書順で出力され、一番右の配列が最も速く変化します。ちょうど桁が繰り上がる数のようです。

```typescript
import { product } from 'es-toolkit/array';

// 数字と文字をすべての組み合わせで対応付けます。
product([1, 2], ['a', 'b']);
// Returns: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

// 3ビットのすべての二進タプルを生成します。
product([0, 1], [0, 1], [0, 1]);
// Returns: [[0,0,0], [0,0,1], [0,1,0], [0,1,1], [1,0,0], [1,0,1], [1,1,0], [1,1,1]]
```

入力配列のいずれかが空の場合、結果は空配列になります。引数を渡さない場合は、空のタプル1つを含む配列が返されます。

```typescript
import { product } from 'es-toolkit/array';

product([1, 2, 3], []); // []
product(); // [[]]
```

#### パラメータ

- `arrs` (`Array<readonly T[]>`): 積を計算する配列です。

#### 戻り値

(`T[][]`): デカルト積の結果として生成されたタプルの配列を返します。

## 使用例

::: sandpack

```ts index.ts
import { product } from 'es-toolkit/array';

console.log(product([1, 2], ['a', 'b']));
```

:::
