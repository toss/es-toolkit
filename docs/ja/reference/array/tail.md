# tail

配列の最初の要素を除いたすべての要素で構成される新しい配列を返します。

```typescript
const result = tail(arr);
```

## 使用法

### `tail(arr)`

配列から最初の要素だけを除いて残りのすべての要素を取得したい場合は `tail` を使用してください。配列が空であるか要素が1つだけの場合は空の配列を返します。スタックやキューで最初の要素を除いた残りを処理するときに便利です。

```typescript
import { tail } from 'es-toolkit/array';

// 数値配列から最初の要素を除きます。
const numbers = [1, 2, 3, 4, 5];
tail(numbers);
// Returns: [2, 3, 4, 5]

// 文字列配列から最初の要素を除きます。
const strings = ['first', 'second', 'third'];
tail(strings);
// Returns: ['second', 'third']

// 要素が1つだけの配列は空の配列を返します。
const single = [42];
tail(single);
// Returns: []
```

空の配列や特殊なケースも安全に処理します。

```typescript
import { tail } from 'es-toolkit/array';

// 空の配列は空の配列を返します。
const empty: number[] = [];
tail(empty);
// Returns: []

// 入れ子配列も処理できます。
const nested = [
  [1, 2],
  [3, 4],
  [5, 6],
];
tail(nested);
// Returns: [[3, 4], [5, 6]]

// オブジェクト配列も処理できます。
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];
tail(users);
// Returns: [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
```

#### パラメータ

- `arr` (`readonly T[]`): 最初の要素を除く配列です。

#### 戻り値

(`T[]`): 最初の要素を除いた新しい配列を返します。入力配列が空であるか要素が1つだけの場合は空の配列を返します。
