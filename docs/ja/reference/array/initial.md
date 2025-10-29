# initial

配列の最後の要素を除いたすべての要素からなる新しい配列を返します。

```typescript
const result = initial(arr);
```

## 参照

### `initial(arr)`

配列から最後の要素だけ除いて残りのすべての要素を取得したい場合は `initial` を使用してください。配列が空であるか要素が一つだけの場合は空の配列を返します。配列の末尾を除いて処理する際に便利です。

```typescript
import { initial } from 'es-toolkit/array';

// 数値配列から最後の要素を除く
const numbers = [1, 2, 3, 4, 5];
initial(numbers);
// Returns: [1, 2, 3, 4]

// 文字列配列から最後の要素を除く
const strings = ['a', 'b', 'c'];
initial(strings);
// Returns: ['a', 'b']

// 要素が一つだけの配列は空の配列を返す
const single = [42];
initial(single);
// Returns: []
```

空の配列や特殊なケースも安全に処理します。

```typescript
import { initial } from 'es-toolkit/array';

// 空の配列は空の配列を返す
const empty: number[] = [];
initial(empty);
// Returns: []

// ネストされた配列も処理できる
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
initial(nested);
// Returns: [[1, 2], [3, 4]]
```

#### パラメータ

- `arr` (`readonly T[]`): 最後の要素を除く配列。

#### 戻り値

(`T[]`): 最後の要素を除いた新しい配列を返します。入力配列が空であるか要素が一つだけの場合は空の配列を返します。
