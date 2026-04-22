# chain

複数のイテラブルを順番に結合して、1つのイテラブルにします。

```typescript
const iterable = chain(iterable1, iterable2, iterable3);
```

## 使い方

### `chain(...iterables)`

複数のイテラブルを順番に反復処理したいときに `chain` を使ってください。`[...arr1, ...arr2]` のように新しい配列をメモリに作成せず、実際に反復処理するまで各イテラブルを消費しません。

```typescript
import { chain } from 'es-toolkit/iterator';

// 複数の配列を順番に結合します。
const result = chain([1, 2, 3], [4, 5, 6]);
console.log([...result]); // [1, 2, 3, 4, 5, 6]

// 配列だけでなく、あらゆるイテラブルで動作します。
const result = chain(new Set([1, 2]), new Map([[3, 'a']]).keys());
console.log([...result]); // [1, 2, 3]
```

空のイテラブルはスキップされます。

```typescript
import { chain } from 'es-toolkit/iterator';

const result = chain([], [1, 2], []);
console.log([...result]); // [1, 2]
```

#### パラメータ

- `iterables` (`...Iterable<T>[]`): 結合するイテラブルです。

#### 返り値

(`IterableIterator<T>`): 各イテラブルの要素を順番に yield する遅延評価のイテラブルイテレータです。