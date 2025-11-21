# zip

複数の配列を、各配列の同じインデックスの要素をまとめたタプルの配列に変換します。

```typescript
const zipped = zip(...arrs);
```

## 使用法

### `zip(...arrs)`

複数の配列の同じ位置にある要素を1つにまとめたい場合は `zip` を使用してください。各配列の同じインデックスにある要素をタプルにまとめて新しい配列を返します。

```typescript
import { zip } from 'es-toolkit/array';

// 2つの配列をまとめます。
zip([1, 2, 3], ['a', 'b', 'c']);
// Returns: [[1, 'a'], [2, 'b'], [3, 'c']]

// 3つの配列をまとめます。
zip([1, 2], ['a', 'b', 'c'], [true, false]);
// Returns: [[1, 'a', true], [2, 'b', false], [undefined, 'c', undefined]]
```

配列の長さが異なる場合、最も長い配列の長さに合わせられます。短い配列の空の位置は `undefined` で埋められます。

```typescript
import { zip } from 'es-toolkit/array';

zip([1, 2], ['a', 'b', 'c', 'd']);
// Returns: [[1, 'a'], [2, 'b'], [undefined, 'c'], [undefined, 'd']]
```

#### パラメータ

- `arrs` (`Array<readonly T[]>`): まとめる配列です。

#### 戻り値

(`T[][]`): 各入力配列の対応するインデックスの要素をタプルにまとめた新しい配列を返します。
