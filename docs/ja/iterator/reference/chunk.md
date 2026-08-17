# chunk (`Iterator`向け)

イテレータの要素を、指定した長さの配列に遅延的にまとめます。

```typescript
const chunks = chunk(source, size);
```

## 使用法

### `chunk(source, size)`

要素のストリームを固定サイズのまとまりで処理したいときに `chunk` を使用してください。たとえば、レコードを 100 件ずつデータベースに保存する場合などです。各チャンクは要求された時点でのみ生成されるため、ネイティブの `take` のような途中で打ち切れるヘルパーで範囲を区切れば、無限イテレータでも使用できます。ソースの長さが `size` のちょうど倍数でない場合、最後のチャンクには残りの要素が入るため、他より短くなることがあります。

```typescript
import { chunk } from 'es-toolkit/iterator';

// 要素を 2 個ずつまとめます。余った要素は短い最後のチャンクになります。
chunk([1, 2, 3, 4, 5].values(), 2).toArray();
// 結果: [[1, 2], [3, 4], [5]]

// 無限のソースをバッチで処理し、take で範囲を区切ります。
chunk(sensorReadings(), 100).take(2).toArray();
// 結果: 100 件ずつの最初の 2 バッチ
```

#### パラメータ

- `source` (`Iterator<T>`): チャンクに分割するイテレータです。
- `size` (`number`): 各チャンクの長さです。0 より大きい整数である必要があります。

#### 戻り値

(`IteratorObject<T[], undefined>`): 最大 `size` 個の要素を持つ配列を生成する遅延評価のイテレータです。ネイティブのイテレータヘルパー（`map`、`take`、`toArray` など）をすべて備えているため、そのままチェーンを続けられます。

#### エラー

`size` が 0 より大きい整数でない場合、エラーを投げます。

### `pipe` と一緒に使う `chunk(size)`

[`pipe`](../../fp/reference/pipe.md) で変換をつなげるときは、`es-toolkit/fp/iterator` からカリー化された形式をインポートしてください。`size` だけを受け取り、イテレータを受け取る関数を返します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { chunk, toArray } from 'es-toolkit/fp/iterator';

pipe([1, 2, 3, 4, 5].values(), chunk(2), toArray());
// 結果: [[1, 2], [3, 4], [5]]
```
