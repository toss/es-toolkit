# cartesianProduct

関数型パイプラインで使える data-last の `cartesianProduct` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, cartesianProduct(['a', 'b']));
```

## 使い方

`cartesianProduct` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { cartesianProduct, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2], cartesianProduct(['a', 'b']));
// [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
```

## API

### `cartesianProduct(...)`

戻り値: A function that accepts the piped input.
