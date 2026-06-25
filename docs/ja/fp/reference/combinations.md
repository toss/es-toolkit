# combinations

関数型パイプラインで使える data-last の `combinations` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, combinations(2));
```

## 使い方

`combinations` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { combinations, pipe } from 'es-toolkit/fp';

const result = pipe([1, 2, 3], combinations(2));
// [[1, 2], [1, 3], [2, 3]]
```

## API

### `combinations(...)`

戻り値: A function that accepts the piped input.
