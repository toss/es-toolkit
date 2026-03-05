# zipIterable

複数のイテラブルを同じインデックスの要素ごとにまとめて、タプルのイテラブルにします。

```typescript
const iterable = zipIterable(iterable1, iterable2);
```

## 使い方

### `zipIterable(...iterables)`

複数のイテラブルを同時に反復処理しながら、同じインデックスの要素をまとめたいときに `zipIterable` を使ってください。`es-toolkit/array` の `zip` と異なり、配列だけでなくあらゆるイテラブルを受け取ることができ、実際に反復処理するまで要素を消費しません。

最も短いイテラブルが尽きたときに停止します。

```typescript
import { zipIterable } from 'es-toolkit/iterator';

// 2つの配列の要素を同じインデックスでまとめます。
const result = zipIterable([1, 2, 3], ['a', 'b', 'c']);
console.log([...result]); // [[1, 'a'], [2, 'b'], [3, 'c']]

// 配列だけでなく、あらゆるイテラブルで動作します。
const result = zipIterable(new Set(['alice', 'bob']), [90, 85]);
console.log([...result]); // [['alice', 90], ['bob', 85]]
```

長さが異なる場合は、最も短いイテラブルに合わせて停止します。

```typescript
import { zipIterable } from 'es-toolkit/iterator';

const result = zipIterable([1, 2, 3], ['a', 'b']);
console.log([...result]); // [[1, 'a'], [2, 'b']]
```

### `es-toolkit/array` の `zip` との違い

| | `array/zip` | `iterator/zipIterable` |
| --- | --- | --- |
| 入力 | `Array` のみ | あらゆる `Iterable` |
| 出力 | `Array` | `IterableIterator`（遅延評価） |
| 長さが異なる場合 | 長い方に合わせ `undefined` で埋める | 短い方で停止 |
| メモリ | 配列全体を即時生成 | 必要な分だけ消費 |

#### パラメータ

- `iterables` (`...Iterable<T>[]`): まとめるイテラブルです。

#### 返り値

(`IterableIterator<T[]>`): 同じインデックスの要素をタプルとして yield する遅延評価のイテラブルイテレータです。