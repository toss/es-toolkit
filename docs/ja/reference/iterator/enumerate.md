# enumerate

イテラブルの各要素にインデックスを付けてペアにします。

```typescript
const iterable = enumerate(iterable, start);
```

## 使い方

### `enumerate(iterable, start?)`

反復処理中にインデックスと値を同時に使いたいときに `enumerate` を使ってください。`Array.prototype.entries()` と異なり、配列だけでなくあらゆるイテラブルで動作します。

```typescript
import { enumerate } from 'es-toolkit/iterator';

// 各要素にインデックスを付けます。
const result = enumerate(['a', 'b', 'c']);
console.log([...result]); // [[0, 'a'], [1, 'b'], [2, 'c']]

// 配列だけでなく、あらゆるイテラブルで動作します。
for (const [index, value] of enumerate(new Set(['x', 'y', 'z']))) {
  console.log(`${index}: ${value}`);
}
// 0: x
// 1: y
// 2: z
```

第2引数で開始インデックスを指定できます。

```typescript
import { enumerate } from 'es-toolkit/iterator';

const result = enumerate(['a', 'b', 'c'], 1);
console.log([...result]); // [[1, 'a'], [2, 'b'], [3, 'c']]
```

#### パラメータ

- `iterable` (`Iterable<T>`): 列挙するイテラブルです。
- `start` (`number`, オプション): 開始インデックスです。デフォルトは `0` です。

#### 返り値

(`IterableIterator<[number, T]>`): `[インデックス, 要素]` のタプルを yield する遅延評価のイテラブルイテレータです。