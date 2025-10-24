# forEachRight

配列の要素を右から左へ順に走査し、各要素に対して関数を実行します。

```typescript
forEachRight(arr, callback);
```

## 参照

### `forEachRight(arr, callback)`

配列を逆順で走査しながら各要素に対して作業を実行したい場合は `forEachRight` を使用してください。配列の最後の要素から最初の要素まで順番にコールバック関数を呼び出します。逆順処理が必要な場合や配列の末尾から作業する必要がある場合に便利です。

```typescript
import { forEachRight } from 'es-toolkit/array';

const array = [1, 2, 3];
const result: number[] = [];

// forEachRight関数を使用して配列を逆順で走査します。
forEachRight(array, value => {
  result.push(value);
});

console.log(result); // [3, 2, 1]
```

コールバック関数は3つのパラメータを受け取ります。

```typescript
import { forEachRight } from 'es-toolkit/array';

const array = ['a', 'b', 'c'];
forEachRight(array, (value, index, arr) => {
  console.log(`値: ${value}, インデックス: ${index}, 配列:`, arr);
});
// 出力:
// 値: c, インデックス: 2, 配列: ['a', 'b', 'c']
// 値: b, インデックス: 1, 配列: ['a', 'b', 'c']
// 値: a, インデックス: 0, 配列: ['a', 'b', 'c']
```

#### パラメータ

- `arr` (`T[]`): 走査する配列です。
- `callback` (`(value: T, index: number, arr: T[]) => void`): 各要素に対して実行される関数です。
  - `value`: 現在処理中の配列要素です。
  - `index`: 現在処理中の要素のインデックスです。
  - `arr`: `forEachRight` 関数が呼び出された配列です。
