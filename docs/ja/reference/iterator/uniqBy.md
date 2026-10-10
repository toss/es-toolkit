# uniqBy (`Iterator`)

変換したキーがまだ登場していないイテレータの要素を、遅延的に生成します。

```typescript
const unique = uniqBy(source, getKey);
```

## 使用法

### `uniqBy(source, getKey)`

要素のストリームを、導出したキーで重複除去したいときに `uniqBy` を使用してください。たとえば、ユーザー ID ごとに最初のイベントだけを残す場合などです。最初に登場した順序が保たれ、キーは SameValueZero のセマンティクス（`Set` と同じ）で比較されるため、`NaN` のキーも重複除去されます。重複除去はストリーミングで行われます。各要素は一意だと分かった時点ですぐに出力されるため、途中で打ち切れるヘルパーで範囲を区切れば、無限イテレータでも使用できます。

```typescript
import { uniqBy } from 'es-toolkit/iterator';

// 変換したキーごとに最初の要素を残します。
uniqBy([1.1, 1.2, 2.3, 2.4].values(), Math.floor).toArray();
// 結果: [1.1, 2.3]

// 導出したキーでオブジェクトを重複除去します。
const events = [
  { userId: 1, type: 'click' },
  { userId: 1, type: 'view' },
  { userId: 2, type: 'click' },
];
uniqBy(events.values(), e => e.userId).toArray();
// 結果: [{ userId: 1, type: 'click' }, { userId: 2, type: 'click' }]
```

#### パラメータ

- `source` (`Iterator<T>`): 重複除去するイテレータです。
- `getKey` (`(value: T) => K`): 要素を、重複の検出に使うキーに変換します。

#### 戻り値

(`IteratorObject<T, undefined>`): 重複したキーを持つ要素を取り除いた遅延評価のイテレータです。ネイティブのイテレータヘルパー（`map`、`take`、`toArray` など）をすべて備えているため、そのままチェーンを続けられます。

### `pipe` と一緒に使う `uniqBy(getKey)`

[`pipe`](../../fp/reference/pipe.md) で変換をつなげるときは、`es-toolkit/fp/iterator` からカリー化された形式をインポートしてください。キー関数だけを受け取り、イテレータを受け取る関数を返します。

```typescript
import { pipe } from 'es-toolkit/fp';
import { toArray, uniqBy } from 'es-toolkit/fp/iterator';

pipe([1.1, 1.2, 2.3, 2.4].values(), uniqBy(Math.floor), toArray());
// 結果: [1.1, 2.3]
```
