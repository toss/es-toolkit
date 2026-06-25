# compact

関数型パイプラインで使える data-last の `compact` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(array, compact());
```

## 使い方

`compact` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { compact, pipe } from 'es-toolkit/fp';

const result = pipe([0, 1, false, 2, '', 3], compact());
// [1, 2, 3]
```

## API

### `compact(...)`

戻り値: A function that accepts the piped input.
