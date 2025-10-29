# zip (Lodash互換)

::: warning `es-toolkit`の[zip](../../array/zip.md)を使用してください

この`zip`関数はLodash互換性のための追加処理により動作が遅くなります。

代わりに、より高速で現代的な`es-toolkit`の[zip](../../array/zip.md)を使用してください。

:::

複数の配列を1つのタプルの配列に結合します。

```typescript
const result = zip([1, 2], ['a', 'b']);
// resultは[[1, 'a'], [2, 'b']]になります。
```

## 参照

### `zip(...arrs)`

複数の配列を受け取り、各インデックスの要素を1つのタプルにまとめて新しい配列を作成します。入力配列の長さが異なる場合、結果の配列の長さは最も長い入力配列の長さとなり、欠落した要素は`undefined`で埋められます。

```typescript
import { zip } from 'es-toolkit/compat';

const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];
const result = zip(arr1, arr2);
// 戻り値: [[1, 'a'], [2, 'b'], [3, 'c']]

// 長さが異なる配列
const arr3 = [true, false];
const result2 = zip(arr1, arr2, arr3);
// 戻り値: [[1, 'a', true], [2, 'b', false], [3, 'c', undefined]]

// 空配列が含まれる場合
zip([1, 2], [], ['a', 'b']);
// 戻り値: [[1, undefined, 'a'], [2, undefined, 'b']]
```

#### パラメータ

- `...arrs` (`any[][]`): 結合する配列。

#### 戻り値

(`any[][]`): 入力配列の各インデックスの要素を含むタプルの新しい配列。
