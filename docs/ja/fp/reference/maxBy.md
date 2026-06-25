# maxBy

関数型パイプラインで使える data-last の `maxBy` 演算子を作成します。[`pipe`](./pipe.md) と一緒に使用します。

```typescript
const result = pipe(
  array,
  maxBy(item => item.score)
);
```

## 使い方

`maxBy` は `pipe` を流れる値を受け取る関数を返します。データを `pipe` の最初の引数に置き、演算子の設定を変換ステップの近くに書けます。

```typescript
import { maxBy, pipe } from 'es-toolkit/fp';

const result = pipe(
  [{ score: 1 }, { score: 3 }, { score: 2 }],
  maxBy(item => item.score)
);
// { score: 3 }
```

## API

### `maxBy(...)`

戻り値: A function that accepts the piped input.
