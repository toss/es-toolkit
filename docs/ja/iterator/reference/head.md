# head

イテレータの最初の要素を返します。空の場合は `undefined` を返します。

```typescript
const first = head(source);
```

## 使用法

### `head(source)`

遅延評価のパイプラインが生成する最初の要素だけが必要なときに `head` を使用してください。要素を 1 つだけ取り出して停止するため、無限イテレータでも安全に使用できます。

`head` はイテレータを覗き見るのではなく消費します。最初の要素を読み取った後、ソースは `return` メソッドを通じて閉じられるため（ネイティブの `Iterator.prototype.find` と同じ動作です）、それ以上イテレートすることはできません。

```typescript
import { head } from 'es-toolkit/iterator';

// 最初の要素を読み取ります。
head([1, 2, 3].values());
// 結果: 1

// 空のイテレータは undefined になります。
head([].values());
// 結果: undefined

// 遅延評価のチェーンでは先頭の要素だけが計算されます。
head([1, 2, 3, 4].values().filter(x => x % 2 === 0));
// 結果: 2
```

#### パラメータ

- `source` (`Iterator<T>`): 最初の要素を読み取るイテレータです。

#### 戻り値

(`T | undefined`): 最初の要素です。イテレータが何も生成しない場合は `undefined` です。

### `pipe` と一緒に使う `head()`

[`pipe`](../../fp/reference/pipe.md) で変換をつなげるときは、`es-toolkit/fp/iterator` からカリー化された形式をインポートし、終端操作として使用してください。

```typescript
import { pipe } from 'es-toolkit/fp';
import { filter, head } from 'es-toolkit/fp/iterator';

pipe(
  [1, 2, 3, 4].values(),
  filter(x => x % 2 === 0),
  head()
);
// 結果: 2
```
