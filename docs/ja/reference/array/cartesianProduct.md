# cartesianProduct

複数の配列の[デカルト積](https://en.wikipedia.org/wiki/Cartesian_product)を計算します。

```typescript
const tuples = cartesianProduct(arr1, arr2);
```

## インターフェース

### `cartesianProduct(...arrs)`

各配列から1つずつ要素を選んで作れるすべての組み合わせが必要なときに `cartesianProduct` を使用してください。

一番右の配列から順番に次の要素を選びながら反復します。一番右の配列のすべての要素を巡り終えたら、一つ左の配列の次の要素を選び、右の配列を最初から再度反復します。この過程をすべての配列について右から左へ順番に繰り返します。

```typescript
import { cartesianProduct } from 'es-toolkit/array';

// 数字と文字をすべての組み合わせで対応付けます。
cartesianProduct([1, 2], ['a', 'b']);
// Returns: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

// 3ビットのすべての二進タプルを生成します。
cartesianProduct([0, 1], [0, 1], [0, 1]);
// Returns: [[0,0,0], [0,0,1], [0,1,0], [0,1,1], [1,0,0], [1,0,1], [1,1,0], [1,1,1]]
```

入力配列のいずれかが空の場合、結果は空配列になります。引数を渡さない場合は、空のタプル1つを含む配列が返されます。

```typescript
import { cartesianProduct } from 'es-toolkit/array';

cartesianProduct([1, 2, 3], []); // []
cartesianProduct(); // [[]]
```

#### パラメータ

- `arrs` (`Array<readonly T[]>`): 積を計算する配列です。

#### 戻り値

(`T[][]`): デカルト積の結果として生成されたタプルの配列を返します。

## 使用例

::: sandpack

```ts index.ts
import { cartesianProduct } from 'es-toolkit/array';

console.log(cartesianProduct([1, 2], ['a', 'b']));
```

:::
